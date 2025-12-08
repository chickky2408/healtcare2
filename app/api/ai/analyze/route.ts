// // app/api/ai/analyze/route.ts - Roboflow Version
// import { NextRequest, NextResponse } from 'next/server'
// import { writeFile } from 'fs/promises'
// import { existsSync, mkdirSync } from 'fs'
// import { join } from 'path'
// import { randomUUID } from 'crypto'
// import { analyzeDentalImage, getDiseaseInfo, formatConfidence } from '@/lib/roboflow'

// export const runtime = 'nodejs'
// export const dynamic = 'force-dynamic'
// export const maxDuration = 60

// export async function POST(req: NextRequest) {
//   console.log('🦷 === Dental AI Analysis Started ===')

//   try {
//     const form = await req.formData()
//     const files = (form.getAll('images').length
//       ? form.getAll('images')
//       : form.getAll('image')) as File[]

//     if (!files || files.length === 0) {
//       return NextResponse.json(
//         { error: 'no_file_uploaded', message: 'Please upload an image' },
//         { status: 400 }
//       )
//     }

//     // Save file
//     const uploadDir = join(process.cwd(), 'public', 'uploads')
//     if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true })

//     const file = files[0]
//     const buf = Buffer.from(await file.arrayBuffer())
//     const ext = (file.name?.split('.').pop() || 'png').toLowerCase()
//     const fileName = `dental_${Date.now()}_${randomUUID()}.${ext}`
//     const filePath = join(uploadDir, fileName)

//     await writeFile(filePath, buf)
//     console.log(`✅ File saved: ${fileName}`)

//     // Analyze with Roboflow
//     const analysisResult = await analyzeDentalImage(filePath)

//     if (!analysisResult.success) {
//       return NextResponse.json(
//         {
//           error: 'analysis_failed',
//           message: analysisResult.error || 'Failed to analyze image'
//         },
//         { status: 500 }
//       )
//     }

//     // Process results
//     const predictions = analysisResult.predictions || []
//     const summary = analysisResult.summary!

//     // Build findings array from all predictions
//     const findings: string[] = []
//     const diseaseDetails: any[] = []

//     if (predictions.length === 0) {
//       findings.push('No dental diseases detected')
//       findings.push('Teeth appear healthy')
//       diseaseDetails.push({
//         name: 'Healthy',
//         severity: 'low',
//         confidence: 0,
//         recommendations: [
//           'Continue maintaining good oral hygiene',
//           'Brush twice daily with fluoride toothpaste',
//           'Regular dental check-ups every 6 months'
//         ]
//       })
//     } else {
//       // Group predictions by class
//       const diseaseGroups = predictions.reduce((acc, pred) => {
//         if (!acc[pred.class]) {
//           acc[pred.class] = []
//         }
//         acc[pred.class].push(pred)
//         return acc
//       }, {} as Record<string, typeof predictions>)

//       // Process each disease type
//       Object.entries(diseaseGroups).forEach(([diseaseClass, preds]) => {
//         const maxConfidence = Math.max(...preds.map(p => p.confidence))
//         const count = preds.length

//         findings.push(
//           `${diseaseClass}: ${count} detection(s), highest confidence ${formatConfidence(maxConfidence)}`
//         )

//         const diseaseInfo = getDiseaseInfo(diseaseClass)
//         diseaseDetails.push({
//           ...diseaseInfo,
//           confidence: maxConfidence,
//           detectionCount: count
//         })
//       })
//     }

//     // Generate comprehensive explanation
//     let explanation = ''

//     if (summary.totalDetections === 0) {
//       explanation = 'Your dental X-ray analysis shows no significant dental diseases detected. '
//       explanation += 'This is a positive sign! However, this AI analysis is not a substitute for professional dental examination. '
//       explanation += 'Continue maintaining good oral hygiene practices including brushing twice daily, flossing, and regular dental check-ups.'
//     } else {
//       explanation = `Our AI analysis has detected ${summary.totalDetections} potential dental issue(s) in your X-ray. `
//       explanation += `The following conditions were identified: ${summary.detectedDiseases.join(', ')}. `

//       // Add severity-based recommendations
//       const highSeverity = diseaseDetails.filter(d => d.severity === 'high')
//       if (highSeverity.length > 0) {
//         explanation += 'Some detected conditions require urgent dental consultation. '
//       }

//       explanation += 'Please consult with a dentist for professional diagnosis and treatment planning. '
//       explanation += 'This AI analysis is a screening tool and not a replacement for professional dental care.'
//     }

//     // Return results
//     return NextResponse.json({
//       success: true,
//       results: [{
//         label: summary.totalDetections > 0
//           ? summary.detectedDiseases[0].toLowerCase().replace(/ /g, '_')
//           : 'healthy',
//         confidence: summary.highestConfidence,
//         findings,
//         explanation,
//         imagePath: fileName,
//         imageUrl: `/uploads/${fileName}`,
//         timestamp: new Date().toISOString(),
//         detailedAnalysis: {
//           totalDetections: summary.totalDetections,
//           detectedDiseases: summary.detectedDiseases,
//           averageConfidence: summary.averageConfidence,
//           diseaseDetails,
//           predictions: predictions.map(p => ({
//             disease: p.class,
//             confidence: p.confidence,
//             location: {
//               x: p.x,
//               y: p.y,
//               width: p.width,
//               height: p.height
//             }
//           }))
//         }
//       }]
//     })

//   } catch (e: any) {
//     console.error('❌ [AI Analyze Error]:', e?.message || e)

//     return NextResponse.json(
//       {
//         error: 'analysis_failed',
//         message: e?.message || 'Analysis failed',
//         detail: process.env.NODE_ENV === 'development' ? e?.stack : undefined
//       },
//       { status: 500 }
//     )
//   }
// }


//work on production

import { NextRequest, NextResponse } from 'next/server';

// Production deployment with environment variables - v2
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    // รองรับทั้ง 'image' และ 'images'
    const image = (formData.get('image') || formData.get('images')) as File;

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // แปลงรูปเป็น base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // ⚠️ CRITICAL: ต้องมี API Key!
    const API_KEY = process.env.ROBOFLOW_API_KEY;

    if (!API_KEY) {
      console.error('❌ ROBOFLOW_API_KEY not found in environment variables');
      throw new Error('API Key not configured');
    }

    // ✅ ใช้ Roboflow Hosted API (ไม่ใช่ detect.roboflow.com)
    const API_URL = `https://api.roboflow.com/dental-clinic-wtzw1/healthcare-713wl/2`;

    console.log('🔍 Sending request to Roboflow Hosted API...');
    console.log('📍 API URL:', API_URL);
    console.log('🔑 API Key exists:', !!API_KEY);

    const roboflowResponse = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: API_KEY,
        image: {
          type: 'base64',
          value: base64Image
        }
      })
    });

    console.log('📊 Response status:', roboflowResponse.status);

    if (!roboflowResponse.ok) {
      const errorText = await roboflowResponse.text();
      console.error('❌ Roboflow API error:', errorText);
      throw new Error(`Roboflow API error: ${roboflowResponse.status} - ${errorText}`);
    }

    const data = await roboflowResponse.json();
    console.log('✅ Analysis complete:', data);

    // Format response ให้ตรงกับที่ frontend ต้องการ
    if (!data.predictions || data.predictions.length === 0) {
      return NextResponse.json({
        success: true,
        results: [{
          label: 'healthy',
          confidence: 0,
          findings: ['No dental diseases detected', 'Teeth appear healthy'],
          explanation: 'Your dental analysis shows no significant dental diseases detected. This is a positive sign! However, this AI analysis is not a substitute for professional dental examination.',
          imagePath: image.name,
          imageUrl: '',
          timestamp: new Date().toISOString(),
        }]
      });
    }

    const sorted = data.predictions.sort(
      (a: any, b: any) => b.confidence - a.confidence
    );

    const topPrediction = sorted[0];
    const findings = sorted.map((p: any) =>
      `${p.class}: ${(p.confidence * 100).toFixed(2)}% confidence`
    );

    return NextResponse.json({
      success: true,
      results: [{
        label: topPrediction.class.toLowerCase().replace(/ /g, '_'),
        confidence: topPrediction.confidence,
        findings,
        explanation: `AI analysis detected ${sorted.length} potential dental issue(s). The primary condition identified is ${topPrediction.class} with ${(topPrediction.confidence * 100).toFixed(2)}% confidence. Please consult with a dentist for professional diagnosis and treatment planning.`,
        imagePath: image.name,
        imageUrl: '',
        timestamp: new Date().toISOString(),
        detailedAnalysis: {
          totalDetections: sorted.length,
          predictions: sorted
        }
      }]
    });

  } catch (error) {
    console.error('❌ Roboflow analysis error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze image',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

//work on production





//work on localhost

// import { NextRequest, NextResponse } from 'next/server';

// // Production deployment with environment variables - v2
// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData();
//     // รองรับทั้ง 'image' และ 'images'
//     const image = (formData.get('image') || formData.get('images')) as File;

//     if (!image) {
//       return NextResponse.json(
//         { error: 'No image provided' },
//         { status: 400 }
//       );
//     }

//     // แปลงรูปเป็น base64
//     const bytes = await image.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const base64Image = buffer.toString('base64');

//     // ⚠️ CRITICAL: ต้องมี API Key!
//     // ลองใช้ Publishable Key สำหรับ Public Plan
//     const API_KEY = process.env.ROBOFLOW_PUBLISHABLE_KEY || process.env.ROBOFLOW_API_KEY;

//     if (!API_KEY) {
//       console.error('❌ ROBOFLOW_API_KEY not found in environment variables');
//       throw new Error('API Key not configured');
//     }

//     // ✅ ต้องใส่ API Key ใน URL
//     const API_URL = `https://detect.roboflow.com/healthcare-713wl/2?api_key=${API_KEY}`;
    
//     console.log('🔍 Sending request to Roboflow Inference API...');
//     console.log('📍 API URL:', API_URL.replace(API_KEY, '***')); // Hide key in log

//     const roboflowResponse = await fetch(API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: base64Image,
//     });

//     console.log('📊 Response status:', roboflowResponse.status);

//     if (!roboflowResponse.ok) {
//       const errorText = await roboflowResponse.text();
//       console.error('❌ Roboflow API error:', errorText);
//       throw new Error(`Roboflow API error: ${roboflowResponse.status} - ${errorText}`);
//     }

//     const data = await roboflowResponse.json();
//     console.log('✅ Analysis complete:', data);

//     // Format response ให้ตรงกับที่ frontend ต้องการ
//     if (!data.predictions || data.predictions.length === 0) {
//       return NextResponse.json({
//         success: true,
//         results: [{
//           label: 'healthy',
//           confidence: 0,
//           findings: ['No dental diseases detected', 'Teeth appear healthy'],
//           explanation: 'Your dental analysis shows no significant dental diseases detected. This is a positive sign! However, this AI analysis is not a substitute for professional dental examination.',
//           imagePath: image.name,
//           imageUrl: '',
//           timestamp: new Date().toISOString(),
//         }]
//       });
//     }

//     const sorted = data.predictions.sort(
//       (a: any, b: any) => b.confidence - a.confidence
//     );

//     const topPrediction = sorted[0];
//     const findings = sorted.map((p: any) =>
//       `${p.class}: ${(p.confidence * 100).toFixed(2)}% confidence`
//     );

//     return NextResponse.json({
//       success: true,
//       results: [{
//         label: topPrediction.class.toLowerCase().replace(/ /g, '_'),
//         confidence: topPrediction.confidence,
//         findings,
//         explanation: `AI analysis detected ${sorted.length} potential dental issue(s). The primary condition identified is ${topPrediction.class} with ${(topPrediction.confidence * 100).toFixed(2)}% confidence. Please consult with a dentist for professional diagnosis and treatment planning.`,
//         imagePath: image.name,
//         imageUrl: '',
//         timestamp: new Date().toISOString(),
//         detailedAnalysis: {
//           totalDetections: sorted.length,
//           predictions: sorted
//         }
//       }]
//     });

//   } catch (error) {
//     console.error('❌ Roboflow analysis error:', error);
//     return NextResponse.json(
//       { 
//         error: 'Failed to analyze image',
//         details: error instanceof Error ? error.message : 'Unknown error'
//       },
//       { status: 500 }
//     );
//   }
// }
 