// app/api/ai/analyze/route.ts - Roboflow Version
import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { randomUUID } from 'crypto'
import { analyzeDentalImage, getDiseaseInfo, formatConfidence } from '@/lib/roboflow'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  console.log('🦷 === Dental AI Analysis Started ===')

  try {
    const form = await req.formData()
    const files = (form.getAll('images').length
      ? form.getAll('images')
      : form.getAll('image')) as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'no_file_uploaded', message: 'Please upload an image' },
        { status: 400 }
      )
    }

    // Save file
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true })

    const file = files[0]
    const buf = Buffer.from(await file.arrayBuffer())
    const ext = (file.name?.split('.').pop() || 'png').toLowerCase()
    const fileName = `dental_${Date.now()}_${randomUUID()}.${ext}`
    const filePath = join(uploadDir, fileName)

    await writeFile(filePath, buf)
    console.log(`✅ File saved: ${fileName}`)

    // Analyze with Roboflow
    const analysisResult = await analyzeDentalImage(filePath)

    if (!analysisResult.success) {
      return NextResponse.json(
        {
          error: 'analysis_failed',
          message: analysisResult.error || 'Failed to analyze image'
        },
        { status: 500 }
      )
    }

    // Process results
    const predictions = analysisResult.predictions || []
    const summary = analysisResult.summary!

    // Build findings array from all predictions
    const findings: string[] = []
    const diseaseDetails: any[] = []

    if (predictions.length === 0) {
      findings.push('No dental diseases detected')
      findings.push('Teeth appear healthy')
      diseaseDetails.push({
        name: 'Healthy',
        severity: 'low',
        confidence: 0,
        recommendations: [
          'Continue maintaining good oral hygiene',
          'Brush twice daily with fluoride toothpaste',
          'Regular dental check-ups every 6 months'
        ]
      })
    } else {
      // Group predictions by class
      const diseaseGroups = predictions.reduce((acc, pred) => {
        if (!acc[pred.class]) {
          acc[pred.class] = []
        }
        acc[pred.class].push(pred)
        return acc
      }, {} as Record<string, typeof predictions>)

      // Process each disease type
      Object.entries(diseaseGroups).forEach(([diseaseClass, preds]) => {
        const maxConfidence = Math.max(...preds.map(p => p.confidence))
        const count = preds.length

        findings.push(
          `${diseaseClass}: ${count} detection(s), highest confidence ${formatConfidence(maxConfidence)}`
        )

        const diseaseInfo = getDiseaseInfo(diseaseClass)
        diseaseDetails.push({
          ...diseaseInfo,
          confidence: maxConfidence,
          detectionCount: count
        })
      })
    }

    // Generate comprehensive explanation
    let explanation = ''

    if (summary.totalDetections === 0) {
      explanation = 'Your dental X-ray analysis shows no significant dental diseases detected. '
      explanation += 'This is a positive sign! However, this AI analysis is not a substitute for professional dental examination. '
      explanation += 'Continue maintaining good oral hygiene practices including brushing twice daily, flossing, and regular dental check-ups.'
    } else {
      explanation = `Our AI analysis has detected ${summary.totalDetections} potential dental issue(s) in your X-ray. `
      explanation += `The following conditions were identified: ${summary.detectedDiseases.join(', ')}. `

      // Add severity-based recommendations
      const highSeverity = diseaseDetails.filter(d => d.severity === 'high')
      if (highSeverity.length > 0) {
        explanation += 'Some detected conditions require urgent dental consultation. '
      }

      explanation += 'Please consult with a dentist for professional diagnosis and treatment planning. '
      explanation += 'This AI analysis is a screening tool and not a replacement for professional dental care.'
    }

    // Return results
    return NextResponse.json({
      success: true,
      results: [{
        label: summary.totalDetections > 0
          ? summary.detectedDiseases[0].toLowerCase().replace(/ /g, '_')
          : 'healthy',
        confidence: summary.highestConfidence,
        findings,
        explanation,
        imagePath: fileName,
        imageUrl: `/uploads/${fileName}`,
        timestamp: new Date().toISOString(),
        detailedAnalysis: {
          totalDetections: summary.totalDetections,
          detectedDiseases: summary.detectedDiseases,
          averageConfidence: summary.averageConfidence,
          diseaseDetails,
          predictions: predictions.map(p => ({
            disease: p.class,
            confidence: p.confidence,
            location: {
              x: p.x,
              y: p.y,
              width: p.width,
              height: p.height
            }
          }))
        }
      }]
    })

  } catch (e: any) {
    console.error('❌ [AI Analyze Error]:', e?.message || e)

    return NextResponse.json(
      {
        error: 'analysis_failed',
        message: e?.message || 'Analysis failed',
        detail: process.env.NODE_ENV === 'development' ? e?.stack : undefined
      },
      { status: 500 }
    )
  }
}
