
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
// import { NextResponse } from "next/server";
// import { writeFile } from "fs/promises";
// import fs from "fs";
// import path from "path";
// import { spawn } from "child_process";

// export const dynamic = "force-dynamic";
// export const runtime = "nodejs";

// export async function POST(request: Request) {
//   try {
//     const form = await request.formData();

//     // รับไฟล์จาก field name "image" (รองรับ 1 รูป)
//     const file = form.get("image") as File | null;
//     if (!file || file.size === 0) {
//       return NextResponse.json({ error: "No image file received" }, { status: 400 });
//     }

//     // สร้างโฟลเดอร์อัปโหลด
//     const uploadsDir = path.join(process.cwd(), "public", "uploads");
//     if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

//     // เซฟไฟล์ด้วยชื่อ unique และ sanitize
//     const safeName = `${Date.now()}_${file.name.replace(/[^\w.\-]+/g, "_")}`;
//     const absImagePath = path.join(uploadsDir, safeName);
//     const bytes = Buffer.from(await file.arrayBuffer());
//     await writeFile(absImagePath, bytes);

//     // ---- เรียก Python ด้วย "absolute path" ไปยังสคริปต์ ----
//     // ถ้า analyze.py อยู่ "รากโปรเจ็กต์" ให้ใช้บรรทัดนี้:
//     const scriptPath = path.join(process.cwd(), "analyze.py");
//     // ถ้าอยู่ public/analyze.py ให้เปลี่ยนเป็น:
//     // const scriptPath = path.join(process.cwd(), "public", "analyze.py");

//     // สั่งรัน
//     const child = spawn("python3", [scriptPath, absImagePath], {
//       stdio: ["ignore", "pipe", "pipe"],
//     });

//     let stdout = "";
//     let stderr = "";

//     child.stdout.on("data", (d) => (stdout += d.toString()));
//     child.stderr.on("data", (d) => (stderr += d.toString()));

//     // handle กรณีสคริปต์รันไม่ขึ้น (เช่น python3 ไม่มี)
//     child.on("error", (err) => {
//       console.error("spawn error:", err);
//     });

//     const code: number = await new Promise((resolve) => child.on("close", resolve));

//     if (code !== 0) {
//       console.error("analyze.py exit code:", code, "stderr:", stderr, "stdout:", stdout);
//       return NextResponse.json(
//         { error: "analysis_failed", detail: stderr || stdout || "no output" },
//         { status: 500 }
//       );
//     }

//     // คาดหวังให้ analyze.py พิมพ์ JSON เช่น {"label":"cavity","confidence":0.92}
//     let parsed: any;
//     try {
//       parsed = JSON.parse(stdout.trim());
//     } catch (e) {
//       console.error("Invalid JSON from analyze.py:", stdout);
//       return NextResponse.json(
//         { error: "invalid_python_output", detail: stdout },
//         { status: 500 }
//       );
//     }

//     // ส่งผลลัพธ์กลับ (เส้นทางรูปให้ฝั่ง UI ใช้แสดงได้)
//     return NextResponse.json({
//       result: parsed.label,
//       confidence: parsed.confidence,
//       imagePath: `/uploads/${safeName}`,
//     });
//   } catch (e: any) {
//     console.error("AI analyze API error:", e);
//     return NextResponse.json({ error: "server_error", detail: String(e?.message || e) }, { status: 500 });
//   }
// }




// fix bug python

// import { NextResponse } from "next/server";
// import { writeFile } from "fs/promises";
// import fs from "fs";
// import path from "path";
// import { spawn } from "child_process";

// export const dynamic = "force-dynamic";
// export const runtime = "nodejs";

// export async function POST(request: Request) {
//   try {
//     const form = await request.formData();
//     const file = form.get("image") as File | null;
//     if (!file || file.size === 0) {
//       return NextResponse.json({ error: "No image file received" }, { status: 400 });
//     }

//     const uploadsDir = path.join(process.cwd(), "public", "uploads");
//     if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

//     const safeName = `${Date.now()}_${file.name.replace(/[^\w.\-]+/g, "_")}`;
//     const absImagePath = path.join(uploadsDir, safeName);
//     const bytes = Buffer.from(await file.arrayBuffer());
//     await writeFile(absImagePath, bytes);

//     // ใช้ python จาก venv (หรือกำหนดผ่าน env)
//     const pythonBin =
//       process.env.PYTHON_BIN ||
//       path.join(process.cwd(), ".venv", "bin", process.platform === "win32" ? "python.exe" : "python");

//     const scriptPath = path.join(process.cwd(), "analyze.py");

//     const child = spawn(pythonBin, [scriptPath, absImagePath], {
//       stdio: ["ignore", "pipe", "pipe"],
//       env: { ...process.env }, // ใช้ .env.local (ROBOFLOW_API_KEY เป็นต้น)
//     });

//     let stdout = "";
//     let stderr = "";
//     child.stdout.on("data", (d) => (stdout += d.toString()));
//     child.stderr.on("data", (d) => (stderr += d.toString()));
//     child.on("error", (err) => { console.error("spawn error:", err); });

//     const code: number = await new Promise((resolve) => child.on("close", resolve));

//     if (code !== 0) {
//       console.error("analyze.py exit code:", code, "stderr:", stderr, "stdout:", stdout);
//       return NextResponse.json(
//         { error: "analysis_failed", detail: stderr || stdout || "no output", code },
//         { status: 500 }
//       );
//     }

//     let parsed: any;
//     try {
//       parsed = JSON.parse(stdout.trim());
//     } catch {
//       console.error("Invalid JSON from analyze.py:", stdout);
//       return NextResponse.json({ error: "invalid_python_output", detail: stdout }, { status: 500 });
//     }

//     return NextResponse.json({
//       result: parsed.label,
//       confidence: parsed.confidence,
//       imagePath: `/uploads/${safeName}`,
//       // debug optional:
//       // diag: parsed.__diag,
//     });
//   } catch (e: any) {
//     console.error("AI analyze API error:", e);
//     return NextResponse.json({ error: "server_error", detail: String(e?.message || e) }, { status: 500 });
//   }
// }




// app/api/ai/analyze/route.ts
import { NextRequest, NextResponse } from "next/server";
import { existsSync, mkdirSync } from "node:fs";
import { writeFile, unlink } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const HF_API_KEY = process.env.HF_API_KEY!;
const MODEL_ID = process.env.MEDGEMMA_MODEL_ID || "google/medgemma-4b-it";
const MAX_NEW_TOKENS = Number(process.env.MEDGEMMA_MAX_NEW_TOKENS || 220);

// ---- Helper: call Hugging Face Inference API ----
async function callMedGemma(imageB64: string) {
  const prompt = `
You are a dental assistant. Analyze the provided teeth photo and respond ONLY with strict JSON (no prose).
The JSON schema is:
{
  "label": "one of: healthy, caries_suspected, plaque, calculus_tartar, gingivitis_suspected, misalignment, other",
  "confidence": 0.0-1.0,
  "findings": [ "bullet point", ... ],
  "explanation": "120-180 words, patient-friendly, avoid definitive diagnosis, suggest seeing a dentist if needed"
}
Rules:
- Choose the SINGLE most likely label from the allowed set.
- confidence is your probability for that label.
- findings is short list (<=6) of concrete visual cues.
- Output JSON ONLY.
`;

  const res = await fetch(`https://api-inference.huggingface.co/models/${MODEL_ID}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // สำหรับโมเดล image-text-to-text: ใส่ image (base64) + prompt
      // รูปแบบนี้รองรับรุ่นตระกูล Gemma/Med-Gemma บน Inference API
      inputs: { image: imageB64, prompt },
      parameters: { max_new_tokens: MAX_NEW_TOKENS, temperature: 0.2 },
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`hf_api_error: ${res.status} ${err}`);
  }

  // ผลลัพธ์จาก Inference API มักเป็น array ของข้อความ
  const data = (await res.json()) as any;

  // กรณีส่งคืนเป็นข้อความดิบ
  const text: string =
    Array.isArray(data) && data[0]?.generated_text
      ? String(data[0].generated_text)
      : typeof data === "string"
      ? data
      : JSON.stringify(data);

  // บางครั้งโมเดลจะคืนทั้ง prompt + JSON → ดึงเฉพาะ JSON ก้อนสุดท้าย
  const lastBrace = text.lastIndexOf("{");
  const jsonText = lastBrace >= 0 ? text.slice(lastBrace) : text;

  let parsed: {
    label: string;
    confidence: number;
    findings?: string[];
    explanation?: string;
  };

  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error("invalid_json_from_model");
  }

  // sanitize เบื้องต้น
  const allow = new Set([
    "healthy",
    "caries_suspected",
    "plaque",
    "calculus_tartar",
    "gingivitis_suspected",
    "misalignment",
    "other",
  ]);
  const label = allow.has(parsed.label) ? parsed.label : "other";
  let conf = Number(parsed.confidence);
  if (!Number.isFinite(conf)) conf = 0.5;
  conf = Math.max(0, Math.min(1, conf));

  return {
    label,
    confidence: conf,
    findings: Array.isArray(parsed.findings) ? parsed.findings.slice(0, 6) : [],
    explanation: typeof parsed.explanation === "string" ? parsed.explanation : undefined,
  };
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const files = (form.getAll("images").length ? form.getAll("images") : form.getAll("image")) as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "no file uploaded (use 'images')" }, { status: 400 });
    }
    if (!HF_API_KEY) {
      return NextResponse.json({ error: "missing HF_API_KEY" }, { status: 500 });
    }

    // เขียนไฟล์ลง /tmp (optional เผื่ออยากใช้เก็บประวัติ) แล้วแปลงเป็น base64 ส่งให้โมเดล
    const uploadDir = join("/tmp", "ai_uploads");
    if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });

    const first = files[0];
    const buf = Buffer.from(await first.arrayBuffer());
    const ext = (first.name?.split(".").pop() || "png").toLowerCase();
    const filePath = join(uploadDir, `${randomUUID()}.${ext}`);
    await writeFile(filePath, buf);

    const imageB64 = `data:image/${ext};base64,${buf.toString("base64")}`;

    let out;
    try {
      out = await callMedGemma(imageB64);
    } finally {
      // เก็บกวาดไฟล์ชั่วคราว
      unlink(filePath).catch(() => {});
    }

    return NextResponse.json({
      results: [
        {
          label: out.label,
          confidence: out.confidence,
          imagePath: filePath, // ชี้ตำแหน่งชั่วคราว (จะโดนลบแล้ว)
          explanation: out.explanation,
          findings: out.findings,
        },
      ],
    });
  } catch (e: any) {
    console.error("[ai/analyze] error:", e?.message || e);
    // ให้หน้าเว็บเห็นข้อความอ่านง่าย
    const msg =
      e?.message?.includes("hf_api_error") ? "medgemma_api_error" :
      e?.message === "invalid_json_from_model" ? "invalid_json_from_model" :
      "unknown";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}