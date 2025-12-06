import { readFileSync } from 'fs'

const ROBOFLOW_API_KEY = process.env.ROBOFLOW_API_KEY!
const ROBOFLOW_WORKSPACE = process.env.ROBOFLOW_WORKSPACE || 'dental-disease-detection'
const ROBOFLOW_MODEL_ID = process.env.ROBOFLOW_MODEL_ID || 'dental-diseases-ft9om'
const ROBOFLOW_VERSION = process.env.ROBOFLOW_VERSION || '3'

export interface RoboflowPrediction {
  x: number
  y: number
  width: number
  height: number
  confidence: number
  class: string
  class_id: number
  detection_id: string
}

export interface RoboflowResponse {
  time: number
  image: {
    width: number
    height: number
  }
  predictions: RoboflowPrediction[]
}

export interface AnalysisResult {
  success: boolean
  predictions?: RoboflowPrediction[]
  summary?: {
    totalDetections: number
    detectedDiseases: string[]
    highestConfidence: number
    averageConfidence: number
  }
  error?: string
}

/**
 * Analyze dental X-ray image using Roboflow REST API
 */
export async function analyzeDentalImage(imagePath: string): Promise<AnalysisResult> {
  try {
    if (!ROBOFLOW_API_KEY) {
      throw new Error('ROBOFLOW_API_KEY is not configured')
    }

    console.log('🔍 Analyzing image with Roboflow Inference API...')
    console.log(`Workspace: ${ROBOFLOW_WORKSPACE}`)
    console.log(`Model: ${ROBOFLOW_MODEL_ID}, Version: ${ROBOFLOW_VERSION}`)

    // Read image file and convert to base64
    const imageBuffer = readFileSync(imagePath)
    const base64Image = imageBuffer.toString('base64')

    // Use Roboflow Hosted Inference API
    const apiUrl = `https://detect.roboflow.com/${ROBOFLOW_MODEL_ID}/${ROBOFLOW_VERSION}`

    console.log('📡 Sending request to Roboflow Hosted Inference API...')
    console.log(`API URL: ${apiUrl}`)

    // Send request with proper format for Roboflow Hosted Inference API
    const response = await fetch(`${apiUrl}?api_key=${ROBOFLOW_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: base64Image,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Roboflow API error: ${response.status} - ${errorText}`)
    }

    const data: RoboflowResponse = await response.json()
    const predictions = data.predictions || []

    // Calculate summary statistics
    const totalDetections = predictions.length
    const detectedDiseases = [...new Set(predictions.map((p: RoboflowPrediction) => p.class))]
    const confidences = predictions.map((p: RoboflowPrediction) => p.confidence)
    const highestConfidence = confidences.length > 0 ? Math.max(...confidences) : 0
    const averageConfidence = confidences.length > 0
      ? confidences.reduce((a: number, b: number) => a + b, 0) / confidences.length
      : 0

    console.log('✅ Analysis complete!')
    console.log(`Total detections: ${totalDetections}`)
    console.log(`Detected diseases: ${detectedDiseases.join(', ')}`)
    console.log(`Highest confidence: ${(highestConfidence * 100).toFixed(2)}%`)

    return {
      success: true,
      predictions,
      summary: {
        totalDetections,
        detectedDiseases,
        highestConfidence,
        averageConfidence,
      },
    }
  } catch (error: any) {
    console.error('❌ Roboflow analysis error:', error)

    return {
      success: false,
      error: error?.message || error?.toString() || 'Unknown error',
    }
  }
}

/**
 * Get disease information and recommendations
 */
export function getDiseaseInfo(diseaseClass: string): {
  name: string
  description: string
  severity: 'low' | 'medium' | 'high'
  recommendations: string[]
} {
  const diseaseMap: Record<string, {
    name: string
    description: string
    severity: 'low' | 'medium' | 'high'
    recommendations: string[]
  }> = {
    'Caries': {
      name: 'Dental Caries (Tooth Decay)',
      description: 'Bacterial infection that causes demineralization and destruction of tooth structure',
      severity: 'medium',
      recommendations: [
        'Schedule dental appointment for filling or restoration',
        'Improve oral hygiene - brush twice daily with fluoride toothpaste',
        'Reduce sugar intake and acidic foods',
        'Consider fluoride treatment',
      ],
    },
    'Periapical Lesion': {
      name: 'Periapical Lesion',
      description: 'Infection at the root tip of the tooth, often requiring root canal treatment',
      severity: 'high',
      recommendations: [
        'Urgent dental consultation required',
        'May need root canal treatment or extraction',
        'Take prescribed antibiotics if infection is present',
        'Avoid chewing on affected side',
      ],
    },
    'Impacted Tooth': {
      name: 'Impacted Tooth',
      description: 'Tooth that fails to fully emerge through the gum',
      severity: 'medium',
      recommendations: [
        'Consult dentist for evaluation',
        'May require surgical extraction',
        'Monitor for pain, swelling, or infection',
        'Maintain good oral hygiene around the area',
      ],
    },
    'Calculus': {
      name: 'Dental Calculus (Tartar)',
      description: 'Hardened plaque buildup on teeth that can lead to gum disease',
      severity: 'low',
      recommendations: [
        'Professional dental cleaning required',
        'Improve daily brushing and flossing',
        'Use antiseptic mouthwash',
        'Regular dental check-ups every 6 months',
      ],
    },
  }

  return diseaseMap[diseaseClass] || {
    name: diseaseClass,
    description: 'Dental condition detected',
    severity: 'medium',
    recommendations: [
      'Consult with dentist for proper diagnosis',
      'Maintain good oral hygiene',
      'Schedule regular dental check-ups',
    ],
  }
}

/**
 * Format confidence percentage
 */
export function formatConfidence(confidence: number): string {
  return `${(confidence * 100).toFixed(2)}%`
}
