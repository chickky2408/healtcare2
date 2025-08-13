
// import { NextRequest, NextResponse } from 'next/server'
// import { writeFile } from 'fs/promises'
// import path from 'path'
// import { spawn } from 'child_process'
// import { mkdirSync, existsSync } from 'fs'

// export const dynamic = 'force-dynamic'

// export async function POST(req: NextRequest) {
//   const formData = await req.formData()
//   const files = formData.getAll('image') as File[]

//   if (!files || files.length === 0) {
//     return NextResponse.json({ error: 'No image files received' }, { status: 400 })
//   }

//   const uploadDir = path.join(process.cwd(), 'public', 'uploads')
//   if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true })

//   const savedPaths: string[] = []

//   for (const file of files) {
//     const buffer = Buffer.from(await file.arrayBuffer())
//     const filePath = path.join(uploadDir, file.name)
//     await writeFile(filePath, buffer)
//     savedPaths.push(filePath)
//   }

//   return new Promise((resolve) => {
//     const python = spawn('python3', ['analyze.py', ...savedPaths])

//     let output = ''
//     python.stdout.on('data', (data) => {
//       output += data.toString()
//     })

//     python.stderr.on('data', (data) => {
//       console.error('stderr:', data.toString())
//     })

//     python.on('close', () => {
//       try {
//         const result = JSON.parse(output)
//         if (result.label === 'Error') {
//           resolve(NextResponse.json({ error: result.message }, { status: 500 }))
//         } else {
//           resolve(NextResponse.json({ result: result.label, confidence: result.confidence }))
//         }
//       } catch {
//         resolve(NextResponse.json({ error: 'Invalid response from AI script' }, { status: 500 }))
//       }
//     })
//   })
// }







//ver2 p2

// app/api/ai/analyze/route.ts
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { spawn } from "child_process";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const form = await request.formData();

    // รับไฟล์จาก field name "image" (รองรับ 1 รูป)
    const file = form.get("image") as File | null;
    if (!file || file.size === 0) {
      return NextResponse.json({ error: "No image file received" }, { status: 400 });
    }

    // สร้างโฟลเดอร์อัปโหลด
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    // เซฟไฟล์ด้วยชื่อ unique และ sanitize
    const safeName = `${Date.now()}_${file.name.replace(/[^\w.\-]+/g, "_")}`;
    const absImagePath = path.join(uploadsDir, safeName);
    const bytes = Buffer.from(await file.arrayBuffer());
    await writeFile(absImagePath, bytes);

    // ---- เรียก Python ด้วย "absolute path" ไปยังสคริปต์ ----
    // ถ้า analyze.py อยู่ "รากโปรเจ็กต์" ให้ใช้บรรทัดนี้:
    const scriptPath = path.join(process.cwd(), "analyze.py");
    // ถ้าอยู่ public/analyze.py ให้เปลี่ยนเป็น:
    // const scriptPath = path.join(process.cwd(), "public", "analyze.py");

    // สั่งรัน
    const child = spawn("python3", [scriptPath, absImagePath], {
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (d) => (stdout += d.toString()));
    child.stderr.on("data", (d) => (stderr += d.toString()));

    // handle กรณีสคริปต์รันไม่ขึ้น (เช่น python3 ไม่มี)
    child.on("error", (err) => {
      console.error("spawn error:", err);
    });

    const code: number = await new Promise((resolve) => child.on("close", resolve));

    if (code !== 0) {
      console.error("analyze.py exit code:", code, "stderr:", stderr, "stdout:", stdout);
      return NextResponse.json(
        { error: "analysis_failed", detail: stderr || stdout || "no output" },
        { status: 500 }
      );
    }

    // คาดหวังให้ analyze.py พิมพ์ JSON เช่น {"label":"cavity","confidence":0.92}
    let parsed: any;
    try {
      parsed = JSON.parse(stdout.trim());
    } catch (e) {
      console.error("Invalid JSON from analyze.py:", stdout);
      return NextResponse.json(
        { error: "invalid_python_output", detail: stdout },
        { status: 500 }
      );
    }

    // ส่งผลลัพธ์กลับ (เส้นทางรูปให้ฝั่ง UI ใช้แสดงได้)
    return NextResponse.json({
      result: parsed.label,
      confidence: parsed.confidence,
      imagePath: `/uploads/${safeName}`,
    });
  } catch (e: any) {
    console.error("AI analyze API error:", e);
    return NextResponse.json({ error: "server_error", detail: String(e?.message || e) }, { status: 500 });
  }
}