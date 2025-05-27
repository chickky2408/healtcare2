
import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { spawn } from 'child_process'
import { mkdirSync, existsSync } from 'fs'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const files = formData.getAll('image') as File[]

  if (!files || files.length === 0) {
    return NextResponse.json({ error: 'No image files received' }, { status: 400 })
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true })

  const savedPaths: string[] = []

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const filePath = path.join(uploadDir, file.name)
    await writeFile(filePath, buffer)
    savedPaths.push(filePath)
  }

  return new Promise((resolve) => {
    const python = spawn('python3', ['analyze.py', ...savedPaths])

    let output = ''
    python.stdout.on('data', (data) => {
      output += data.toString()
    })

    python.stderr.on('data', (data) => {
      console.error('stderr:', data.toString())
    })

    python.on('close', () => {
      try {
        const result = JSON.parse(output)
        if (result.label === 'Error') {
          resolve(NextResponse.json({ error: result.message }, { status: 500 }))
        } else {
          resolve(NextResponse.json({ result: result.label, confidence: result.confidence }))
        }
      } catch {
        resolve(NextResponse.json({ error: 'Invalid response from AI script' }, { status: 500 }))
      }
    })
  })
}