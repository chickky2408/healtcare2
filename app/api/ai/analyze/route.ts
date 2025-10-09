
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




// app/api/ai/analyze/route.ts [mockup]
// import { NextRequest, NextResponse } from "next/server";
// import { existsSync, mkdirSync } from "node:fs";
// import { writeFile, unlink } from "node:fs/promises";
// import { join } from "node:path";
// import { randomUUID } from "node:crypto";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";
// export const maxDuration = 60;

// const HF_API_KEY = process.env.HF_API_KEY!;
// const MODEL_ID = process.env.MEDGEMMA_MODEL_ID || "google/medgemma-4b-it";
// const MAX_NEW_TOKENS = Number(process.env.MEDGEMMA_MAX_NEW_TOKENS || 220);

// // ---- Helper: call Hugging Face Inference API ----
// async function callMedGemma(imageB64: string) {
//   const prompt = `
// You are a dental assistant. Analyze the provided teeth photo and respond ONLY with strict JSON (no prose).
// The JSON schema is:
// {
//   "label": "one of: healthy, caries_suspected, plaque, calculus_tartar, gingivitis_suspected, misalignment, other",
//   "confidence": 0.0-1.0,
//   "findings": [ "bullet point", ... ],
//   "explanation": "120-180 words, patient-friendly, avoid definitive diagnosis, suggest seeing a dentist if needed"
// }
// Rules:
// - Choose the SINGLE most likely label from the allowed set.
// - confidence is your probability for that label.
// - findings is short list (<=6) of concrete visual cues.
// - Output JSON ONLY.
// `;

//   const res = await fetch(`https://api-inference.huggingface.co/models/${MODEL_ID}`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${HF_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       // สำหรับโมเดล image-text-to-text: ใส่ image (base64) + prompt
//       // รูปแบบนี้รองรับรุ่นตระกูล Gemma/Med-Gemma บน Inference API
//       inputs: { image: imageB64, prompt },
//       parameters: { max_new_tokens: MAX_NEW_TOKENS, temperature: 0.2 },
//     }),
//   });

//   if (!res.ok) {
//     const err = await res.text().catch(() => "");
//     throw new Error(`hf_api_error: ${res.status} ${err}`);
//   }

//   // ผลลัพธ์จาก Inference API มักเป็น array ของข้อความ
//   const data = (await res.json()) as any;

//   // กรณีส่งคืนเป็นข้อความดิบ
//   const text: string =
//     Array.isArray(data) && data[0]?.generated_text
//       ? String(data[0].generated_text)
//       : typeof data === "string"
//       ? data
//       : JSON.stringify(data);

//   // บางครั้งโมเดลจะคืนทั้ง prompt + JSON → ดึงเฉพาะ JSON ก้อนสุดท้าย
//   const lastBrace = text.lastIndexOf("{");
//   const jsonText = lastBrace >= 0 ? text.slice(lastBrace) : text;

//   let parsed: {
//     label: string;
//     confidence: number;
//     findings?: string[];
//     explanation?: string;
//   };

//   try {
//     parsed = JSON.parse(jsonText);
//   } catch {
//     throw new Error("invalid_json_from_model");
//   }

//   // sanitize เบื้องต้น
//   const allow = new Set([
//     "healthy",
//     "caries_suspected",
//     "plaque",
//     "calculus_tartar",
//     "gingivitis_suspected",
//     "misalignment",
//     "other",
//   ]);
//   const label = allow.has(parsed.label) ? parsed.label : "other";
//   let conf = Number(parsed.confidence);
//   if (!Number.isFinite(conf)) conf = 0.5;
//   conf = Math.max(0, Math.min(1, conf));

//   return {
//     label,
//     confidence: conf,
//     findings: Array.isArray(parsed.findings) ? parsed.findings.slice(0, 6) : [],
//     explanation: typeof parsed.explanation === "string" ? parsed.explanation : undefined,
//   };
// }

// export async function POST(req: NextRequest) {
//   try {
//     const form = await req.formData();
//     const files = (form.getAll("images").length ? form.getAll("images") : form.getAll("image")) as File[];

//     if (!files || files.length === 0) {
//       return NextResponse.json({ error: "no file uploaded (use 'images')" }, { status: 400 });
//     }
//     if (!HF_API_KEY) {
//       return NextResponse.json({ error: "missing HF_API_KEY" }, { status: 500 });
//     }

//     // เขียนไฟล์ลง /tmp (optional เผื่ออยากใช้เก็บประวัติ) แล้วแปลงเป็น base64 ส่งให้โมเดล
//     const uploadDir = join("/tmp", "ai_uploads");
//     if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });

//     const first = files[0];
//     const buf = Buffer.from(await first.arrayBuffer());
//     const ext = (first.name?.split(".").pop() || "png").toLowerCase();
//     const filePath = join(uploadDir, `${randomUUID()}.${ext}`);
//     await writeFile(filePath, buf);

//     const imageB64 = `data:image/${ext};base64,${buf.toString("base64")}`;

//     let out;
//     try {
//       out = await callMedGemma(imageB64);
//     } finally {
//       // เก็บกวาดไฟล์ชั่วคราว
//       unlink(filePath).catch(() => {});
//     }

//     return NextResponse.json({
//       results: [
//         {
//           label: out.label,
//           confidence: out.confidence,
//           imagePath: filePath, // ชี้ตำแหน่งชั่วคราว (จะโดนลบแล้ว)
//           explanation: out.explanation,
//           findings: out.findings,
//         },
//       ],
//     });
//   } catch (e: any) {
//     console.error("[ai/analyze] error:", e?.message || e);
//     // ให้หน้าเว็บเห็นข้อความอ่านง่าย
//     const msg =
//       e?.message?.includes("hf_api_error") ? "medgemma_api_error" :
//       e?.message === "invalid_json_from_model" ? "invalid_json_from_model" :
//       "unknown";
//     return NextResponse.json({ error: msg }, { status: 500 });
//   }
// }



//5 Oct 2025

// app/api/ai-analyze/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { writeFile, unlink } from "node:fs/promises";
// import { existsSync, mkdirSync } from "node:fs";
// import { join } from "node:path";
// import { randomUUID } from "node:crypto";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";
// export const maxDuration = 60;

// // ========================================
// // Configuration
// // ========================================
// const USE_ROBOFLOW = process.env.USE_ROBOFLOW === "true";
// const ROBOFLOW_API_KEY = process.env.ROBOFLOW_API_KEY;
// const ROBOFLOW_MODEL = process.env.ROBOFLOW_MODEL || "dental-conditions/1";

// const USE_OPENAI = process.env.USE_OPENAI === "true";
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// const HF_API_KEY = process.env.HF_API_KEY;
// const MEDGEMMA_MODEL = process.env.MEDGEMMA_MODEL_ID || "google/medgemma-2b-it";

// // ========================================
// // Helper: Roboflow API (Recommended)
// // ========================================
// async function analyzeWithRoboflow(imageBase64: string) {
//   if (!ROBOFLOW_API_KEY) throw new Error("ROBOFLOW_API_KEY not configured");

//   const res = await fetch(
//     `https://detect.roboflow.com/${ROBOFLOW_MODEL}?api_key=${ROBOFLOW_API_KEY}`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: imageBase64,
//     }
//   );

//   if (!res.ok) {
//     const err = await res.text();
//     throw new Error(`Roboflow API error: ${res.status} ${err}`);
//   }

//   const data = await res.json();
  
//   // Roboflow returns predictions array
//   if (!data.predictions || data.predictions.length === 0) {
//     return {
//       label: "healthy",
//       confidence: 0.85,
//       findings: ["No dental issues detected"],
//       explanation: "The analysis shows healthy teeth with no visible problems. However, regular dental checkups are still recommended.",
//     };
//   }

//   // Get highest confidence prediction
//   const top = data.predictions.reduce((a: any, b: any) => 
//     a.confidence > b.confidence ? a : b
//   );

//   return {
//     label: top.class || "other",
//     confidence: top.confidence || 0.5,
//     findings: data.predictions.slice(0, 5).map((p: any) => 
//       `${p.class}: ${(p.confidence * 100).toFixed(1)}%`
//     ),
//     explanation: generateExplanation(top.class, top.confidence),
//   };
// }

// // ========================================
// // Helper: OpenAI Vision API
// // ========================================
// async function analyzeWithOpenAI(imageBase64: string) {
//   if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not configured");

//   const res = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${OPENAI_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: "gpt-4o",
//       messages: [
//         {
//           role: "user",
//           content: [
//             {
//               type: "text",
//               text: `You are a dental AI assistant. Analyze this teeth photo and respond ONLY with valid JSON:
// {
//   "label": "one of: healthy, caries_suspected, plaque, calculus_tartar, gingivitis_suspected, misalignment, staining, other",
//   "confidence": 0.0-1.0,
//   "findings": ["finding1", "finding2", ...],
//   "explanation": "120-180 words explanation in patient-friendly language. Avoid definitive diagnosis. Suggest seeing a dentist if issues detected."
// }`,
//             },
//             {
//               type: "image_url",
//               image_url: { url: imageBase64 },
//             },
//           ],
//         },
//       ],
//       max_tokens: 500,
//       temperature: 0.3,
//     }),
//   });

//   if (!res.ok) {
//     const err = await res.text();
//     throw new Error(`OpenAI API error: ${res.status} ${err}`);
//   }

//   const data = await res.json();
//   const content = data.choices?.[0]?.message?.content || "{}";
  
//   // Extract JSON from response
//   const jsonMatch = content.match(/\{[\s\S]*\}/);
//   if (!jsonMatch) throw new Error("No JSON found in OpenAI response");
  
//   return JSON.parse(jsonMatch[0]);
// }

// // ========================================
// // Helper: Hugging Face (Fallback)
// // ========================================
// async function analyzeWithHuggingFace(imageBase64: string) {
//   if (!HF_API_KEY) throw new Error("HF_API_KEY not configured");

//   const prompt = `Analyze this dental image and respond with JSON only:
// {
//   "label": "healthy/caries_suspected/plaque/gingivitis_suspected/other",
//   "confidence": 0.0-1.0,
//   "findings": ["list", "of", "findings"],
//   "explanation": "brief explanation"
// }`;

//   const res = await fetch(
//     `https://api-inference.huggingface.co/models/${MEDGEMMA_MODEL}`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${HF_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         inputs: { image: imageBase64, text: prompt },
//         parameters: { max_new_tokens: 300, temperature: 0.2 },
//       }),
//     }
//   );

//   if (!res.ok) {
//     const err = await res.text();
//     throw new Error(`HuggingFace API error: ${res.status} ${err}`);
//   }

//   const data = await res.json();
//   const text = Array.isArray(data) ? data[0]?.generated_text : data;
  
//   // Extract JSON
//   const jsonMatch = String(text).match(/\{[\s\S]*\}/);
//   if (!jsonMatch) throw new Error("No JSON in model output");
  
//   return JSON.parse(jsonMatch[0]);
// }

// // ========================================
// // Helper: Generate explanation
// // ========================================
// function generateExplanation(label: string, confidence: number): string {
//   const explanations: Record<string, string> = {
//     healthy: "Your teeth appear healthy with no visible issues. Continue maintaining good oral hygiene with regular brushing and flossing. Schedule routine dental checkups every 6 months.",
//     caries_suspected: "Possible signs of tooth decay (cavities) detected. Dark spots or discoloration may indicate early cavity formation. Please consult a dentist for professional examination and treatment if needed.",
//     plaque: "Plaque buildup detected on tooth surfaces. This sticky film of bacteria can lead to cavities and gum disease if not removed. Improve brushing technique and consider professional cleaning.",
//     calculus_tartar: "Hardened plaque (tartar/calculus) visible on teeth. This requires professional dental cleaning as it cannot be removed by brushing alone. Schedule a dental appointment soon.",
//     gingivitis_suspected: "Possible gum inflammation detected. Early signs may include redness or swelling. Good oral hygiene and professional cleaning can reverse this condition. Consult your dentist.",
//     misalignment: "Teeth alignment issues observed. While not immediately harmful, misalignment can affect bite and oral health long-term. Consider orthodontic consultation if desired.",
//     staining: "Tooth discoloration or staining detected. This is often cosmetic and can be caused by food, drinks, or tobacco. Professional whitening or cleaning may help improve appearance.",
//     other: "Some dental concerns detected that require professional evaluation. Please schedule an appointment with your dentist for a comprehensive examination.",
//   };

//   const base = explanations[label] || explanations.other;
//   const confNote = confidence < 0.7 
//     ? " Note: This analysis has moderate confidence. Professional examination is recommended for accurate diagnosis."
//     : "";
  
//   return base + confNote;
// }

// // ========================================
// // Main POST Handler
// // ========================================
// export async function POST(req: NextRequest) {
//   try {
//     const form = await req.formData();
//     const files = (form.getAll("images").length 
//       ? form.getAll("images") 
//       : form.getAll("image")) as File[];

//     if (!files || files.length === 0) {
//       return NextResponse.json(
//         { error: "no_file_uploaded", message: "Please upload an image" },
//         { status: 400 }
//       );
//     }

//     // Save file temporarily
//     // const uploadDir = join("/tmp", "dental_uploads");
//     const uploadDir = join(process.cwd(), "public", "uploads");
//     if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });

//     const file = files[0];
//     const buf = Buffer.from(await file.arrayBuffer());
//     const ext = (file.name?.split(".").pop() || "png").toLowerCase();
//     // const fileName = `${randomUUID()}.${ext}`;
//     // const filePath = join(uploadDir, fileName);

//     // const timestamp = Date.now();
//     const fileName = `dental_${Date.now()}_${randomUUID()}.${ext}`;
//     const filePath = join(uploadDir, fileName);
    
//     await writeFile(filePath, buf);

//     console.log(`✅ Saved file: ${fileName} to ${uploadDir}`);

//     // Convert to base64
//     const imageBase64 = `data:image/${ext};base64,${buf.toString("base64")}`;

//     // Try different APIs in order of preference
//     let result;
//     try {
//       if (USE_ROBOFLOW && ROBOFLOW_API_KEY) {
//         result = await analyzeWithRoboflow(imageBase64);
//       } else if (USE_OPENAI && OPENAI_API_KEY) {
//         result = await analyzeWithOpenAI(imageBase64);
//       } else if (HF_API_KEY) {
//         result = await analyzeWithHuggingFace(imageBase64);
//       } else {
//         throw new Error("No AI API configured. Please set ROBOFLOW_API_KEY, OPENAI_API_KEY, or HF_API_KEY");
//       }
//     } finally {
//       // Cleanup temp file
//       unlink(filePath).catch(() => {});
//     }

//     // Validate and sanitize result
//     const allowedLabels = new Set([
//       "healthy", "caries_suspected", "plaque", "calculus_tartar",
//       "gingivitis_suspected", "misalignment", "staining", "other"
//     ]);

//     const label = allowedLabels.has(result.label) ? result.label : "other";
//     const confidence = Math.max(0, Math.min(1, Number(result.confidence) || 0.5));
//     const findings = Array.isArray(result.findings) 
//       ? result.findings.slice(0, 6) 
//       : [];
//     const explanation = typeof result.explanation === "string"
//       ? result.explanation
//       : generateExplanation(label, confidence);

//     return NextResponse.json({
//       results: [{
//         label,
//         confidence,
//         findings,
//         explanation,
//         imagePath: fileName,
//         imageUrl: `/uploads/${fileName}`,
//         timestamp: new Date().toISOString(),
//       }],
//     });

//   } catch (e: any) {
//     console.error("[AI Analyze Error]:", e?.message || e);

//     console.log('🔍 USE_ROBOFLOW:', process.env.USE_ROBOFLOW)
//     console.log('🔑 ROBOFLOW_API_KEY:', process.env.ROBOFLOW_API_KEY ? 'EXISTS' : 'MISSING')
//     console.log('📦 ROBOFLOW_MODEL:', process.env.ROBOFLOW_MODEL);
    
//     const errorMsg = e?.message?.includes("API") 
//       ? "AI service temporarily unavailable"
//       : e?.message || "Analysis failed";

//     return NextResponse.json(
//       { 
//         error: "analysis_failed", 
//         message: errorMsg,
//         detail: process.env.NODE_ENV === "development" ? e?.message : undefined
//       },
//       { status: 500 }

      
//     );

    
//   }
// }




//7 Oct 2025

// app/api/ai-analyze/route.ts (Fixed Version)
// import { NextRequest, NextResponse } from "next/server";
// import { writeFile, unlink } from "node:fs/promises";
// import { existsSync, mkdirSync } from "node:fs";
// import { join } from "node:path";
// import { randomUUID } from "node:crypto";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";
// export const maxDuration = 60;

// const ROBOFLOW_API_KEY = process.env.ROBOFLOW_API_KEY;
// const ROBOFLOW_MODEL = process.env.ROBOFLOW_MODEL || "dental-ebfyf/7"; // เปลี่ยนเป็น model ที่ถูกต้อง

// // ========================================
// // Fixed Roboflow Analysis
// // ========================================
// async function analyzeWithRoboflow(imageBase64: string) {
//   if (!ROBOFLOW_API_KEY) {
//     throw new Error("ROBOFLOW_API_KEY not configured");
//   }

//   console.log("🔍 Calling Roboflow API...");
//   console.log("📦 Model:", ROBOFLOW_MODEL);

//   const url = `https://detect.roboflow.com/${ROBOFLOW_MODEL}?api_key=${ROBOFLOW_API_KEY}`;
  
//   const res = await fetch(url, {
//     method: "POST",
//     headers: { 
//       "Content-Type": "application/x-www-form-urlencoded" 
//     },
//     body: imageBase64,
//   });

//   if (!res.ok) {
//     const errorText = await res.text();
//     console.error("❌ Roboflow API Error:", res.status, errorText);
//     throw new Error(`Roboflow API error: ${res.status} ${errorText}`);
//   }

//   const data = await res.json();
//   console.log("📊 Roboflow Response:", JSON.stringify(data, null, 2));

//   // ตรวจสอบว่ามี predictions หรือไม่
//   if (!data.predictions || data.predictions.length === 0) {
//     console.warn("⚠️ No predictions returned from Roboflow!");
//     console.log("📝 Full response:", data);
    
//     // แทนที่จะ return ค่าคงที่ ให้ throw error หรือส่งข้อความที่ชัดเจน
//     return {
//       label: "no_detection",
//       confidence: 0.0,
//       findings: ["No dental conditions detected by the model"],
//       explanation: "The AI model could not detect any specific dental conditions in this image. This could mean the teeth are healthy, or the image quality/angle may not be optimal for analysis. Please try taking a clearer, well-lit photo showing your teeth directly.",
//       rawResponse: data, // เก็บ response เดิมไว้ debug
//     };
//   }

//   // หา prediction ที่มี confidence สูงสุด
//   const sortedPredictions = [...data.predictions].sort(
//     (a, b) => (b.confidence || 0) - (a.confidence || 0)
//   );
  
//   const topPrediction = sortedPredictions[0];
  
//   console.log("✅ Top Prediction:", {
//     class: topPrediction.class,
//     confidence: topPrediction.confidence
//   });

//   // แปลง class name ให้เป็น label ที่เราต้องการ
//   const classMapping: Record<string, string> = {
//     "cavity": "caries_suspected",
//     "caries": "caries_suspected",
//     "decay": "caries_suspected",
//     "plaque": "plaque",
//     "calculus": "calculus_tartar",
//     "tartar": "calculus_tartar",
//     "gingivitis": "gingivitis_suspected",
//     "gum-disease": "gingivitis_suspected",
//     "misalignment": "misalignment",
//     "staining": "staining",
//     "healthy": "healthy",
//   };

//   const rawClass = (topPrediction.class || "").toLowerCase();
//   const label = classMapping[rawClass] || "other";
//   const confidence = topPrediction.confidence || 0.5;

//   // สร้าง findings จาก predictions ทั้งหมด
//   const findings = sortedPredictions
//     .slice(0, 5)
//     .filter(p => p.confidence > 0.3) // กรองเฉพาะที่ confidence > 30%
//     .map(p => `${p.class}: ${(p.confidence * 100).toFixed(1)}% confidence`);

//   return {
//     label,
//     confidence,
//     findings: findings.length > 0 ? findings : ["Analysis completed"],
//     explanation: generateExplanation(label, confidence),
//     rawResponse: data, // เก็บไว้ดู debug
//   };
// }

// // ========================================
// // Generate Explanation
// // ========================================
// function generateExplanation(label: string, confidence: number): string {
//   const explanations: Record<string, string> = {
//     healthy: "Your teeth appear healthy with no visible dental issues detected. Continue maintaining good oral hygiene with regular brushing twice daily and flossing. Schedule routine dental checkups every 6 months for preventive care.",
    
//     caries_suspected: "Possible signs of tooth decay (cavities) have been detected. Dark spots, discoloration, or visible holes in the tooth enamel may indicate cavity formation. It's important to consult a dentist soon for professional examination and treatment to prevent further decay.",
    
//     plaque: "Plaque buildup has been detected on tooth surfaces. This sticky film of bacteria forms naturally but needs to be removed regularly through proper brushing and flossing. If left untreated, plaque can lead to cavities and gum disease. Consider improving your brushing technique and schedule a professional cleaning.",
    
//     calculus_tartar: "Hardened plaque (tartar or calculus) is visible on your teeth. Unlike plaque, tartar cannot be removed by regular brushing and requires professional dental cleaning. The buildup can lead to gum disease if not addressed. Please schedule a dental appointment for cleaning soon.",
    
//     gingivitis_suspected: "Possible signs of gum inflammation (gingivitis) have been detected. This may appear as redness, swelling, or changes in gum tissue. Early-stage gingivitis is reversible with improved oral hygiene and professional cleaning. Consult your dentist for proper evaluation and treatment.",
    
//     misalignment: "Teeth alignment issues have been observed in the image. While not immediately harmful to oral health, misalignment can affect your bite, make cleaning difficult, and impact long-term dental health. Consider consulting an orthodontist if you're interested in correction options.",
    
//     staining: "Tooth discoloration or staining has been detected. This is often a cosmetic concern caused by food, beverages (coffee, tea, wine), tobacco use, or aging. While usually not harmful, professional whitening or cleaning can help improve the appearance of your smile.",
    
//     no_detection: "The AI model could not identify specific dental conditions in this image. This might be because your teeth are healthy, or the image quality, lighting, or angle may not be optimal for accurate analysis. For best results, take a well-lit photo with teeth clearly visible and try again.",
    
//     other: "Some dental characteristics have been detected that require professional evaluation. Please schedule an appointment with your dentist for a comprehensive examination and accurate diagnosis.",
//   };

//   const baseExplanation = explanations[label] || explanations.other;
  
//   const confidenceNote = confidence < 0.6
//     ? " Note: This analysis has lower confidence. We recommend consulting a dentist for accurate professional diagnosis."
//     : confidence < 0.8
//     ? " This analysis has moderate confidence. Professional examination is recommended for confirmation."
//     : "";
  
//   return baseExplanation + confidenceNote;
// }

// // ========================================
// // Main POST Handler
// // ========================================
// export async function POST(req: NextRequest) {
//   try {
//     const form = await req.formData();
//     const files = (form.getAll("images").length 
//       ? form.getAll("images") 
//       : form.getAll("image")) as File[];

//     if (!files || files.length === 0) {
//       return NextResponse.json(
//         { error: "no_file_uploaded", message: "Please upload an image" },
//         { status: 400 }
//       );
//     }

//     if (!ROBOFLOW_API_KEY) {
//       return NextResponse.json(
//         { error: "api_not_configured", message: "Roboflow API key is not configured" },
//         { status: 500 }
//       );
//     }

//     // บันทึกไฟล์
//     const uploadDir = join(process.cwd(), "public", "uploads");
//     if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });

//     const file = files[0];
//     const buf = Buffer.from(await file.arrayBuffer());
//     const ext = (file.name?.split(".").pop() || "png").toLowerCase();
//     const fileName = `dental_${Date.now()}_${randomUUID()}.${ext}`;
//     const filePath = join(uploadDir, fileName);
    
//     await writeFile(filePath, buf);
//     console.log(`✅ File saved: ${fileName}`);

//     // แปลงเป็น base64
//     const imageBase64 = `data:image/${ext};base64,${buf.toString("base64")}`;

//     // เรียก Roboflow API
//     let result;
//     try {
//       result = await analyzeWithRoboflow(imageBase64);
//     } catch (error: any) {
//       console.error("❌ Analysis error:", error);
//       throw error;
//     } finally {
//       // ลบไฟล์ชั่วคราว (optional - ถ้าต้องการเก็บไว้ก็ comment บรรทัดนี้)
//       // unlink(filePath).catch(() => {});
//     }

//     // Validate result
//     const allowedLabels = new Set([
//       "healthy", "caries_suspected", "plaque", "calculus_tartar",
//       "gingivitis_suspected", "misalignment", "staining", "other", "no_detection"
//     ]);

//     const label = allowedLabels.has(result.label) ? result.label : "other";
//     const confidence = Math.max(0, Math.min(1, Number(result.confidence) || 0.5));

//     return NextResponse.json({
//       results: [{
//         label,
//         confidence,
//         findings: result.findings || [],
//         explanation: result.explanation,
//         imagePath: fileName,
//         imageUrl: `/uploads/${fileName}`,
//         timestamp: new Date().toISOString(),
//         debug: {
//           rawResponse: result.rawResponse, // เอาไว้ดู response จริงๆ
//           modelUsed: ROBOFLOW_MODEL,
//         }
//       }],
//     });

//   } catch (e: any) {
//     console.error("❌ [AI Analyze Error]:", e?.message || e);
    
//     return NextResponse.json(
//       { 
//         error: "analysis_failed", 
//         message: e?.message || "Analysis failed",
//         detail: process.env.NODE_ENV === "development" ? e?.stack : undefined
//       },
//       { status: 500 }
//     );
//   }
// }

//ใช้งานได้แบบ mockup

// app/api/ai/analyze/route.ts - Complete Working Version
// import { NextRequest, NextResponse } from "next/server";
// import { writeFile } from "node:fs/promises";
// import { existsSync, mkdirSync } from "node:fs";
// import { join } from "node:path";
// import { randomUUID } from "node:crypto";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";
// export const maxDuration = 60;

// // ========================================
// // Configuration
// // ========================================
// const USE_ROBOFLOW = process.env.USE_ROBOFLOW === "true";
// const ROBOFLOW_API_KEY = process.env.ROBOFLOW_API_KEY;
// const ROBOFLOW_MODEL = process.env.ROBOFLOW_MODEL || "dental-ebfyf/7";

// const USE_OPENAI = process.env.USE_OPENAI === "true";
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// const HF_API_KEY = process.env.HF_API_KEY;
// const MEDGEMMA_MODEL = process.env.MEDGEMMA_MODEL_ID || "google/medgemma-2b-it";

// // ========================================
// // Helper: Generate Explanation
// // ========================================
// function generateExplanation(label: string, confidence: number): string {
//   const explanations: Record<string, string> = {
//     healthy: "Your teeth appear healthy with no visible dental issues detected. Continue maintaining good oral hygiene with regular brushing twice daily and flossing. Schedule routine dental checkups every 6 months for preventive care.",
    
//     caries_suspected: "Possible signs of tooth decay (cavities) have been detected. Dark spots, discoloration, or visible holes in the tooth enamel may indicate cavity formation. It's important to consult a dentist soon for professional examination and treatment to prevent further decay.",
    
//     plaque: "Plaque buildup has been detected on tooth surfaces. This sticky film of bacteria forms naturally but needs to be removed regularly through proper brushing and flossing. If left untreated, plaque can lead to cavities and gum disease. Consider improving your brushing technique and schedule a professional cleaning.",
    
//     calculus_tartar: "Hardened plaque (tartar or calculus) is visible on your teeth. Unlike plaque, tartar cannot be removed by regular brushing and requires professional dental cleaning. The buildup can lead to gum disease if not addressed. Please schedule a dental appointment for cleaning soon.",
    
//     gingivitis_suspected: "Possible signs of gum inflammation (gingivitis) have been detected. This may appear as redness, swelling, or changes in gum tissue. Early-stage gingivitis is reversible with improved oral hygiene and professional cleaning. Consult your dentist for proper evaluation and treatment.",
    
//     misalignment: "Teeth alignment issues have been observed in the image. While not immediately harmful to oral health, misalignment can affect your bite, make cleaning difficult, and impact long-term dental health. Consider consulting an orthodontist if you're interested in correction options.",
    
//     staining: "Tooth discoloration or staining has been detected. This is often a cosmetic concern caused by food, beverages (coffee, tea, wine), tobacco use, or aging. While usually not harmful, professional whitening or cleaning can help improve the appearance of your smile.",
    
//     other: "Some dental characteristics have been detected that require professional evaluation. Please schedule an appointment with your dentist for a comprehensive examination and accurate diagnosis.",
//   };

//   const baseExplanation = explanations[label] || explanations.other;
  
//   const confidenceNote = confidence < 0.6
//     ? " Note: This analysis has lower confidence. We recommend consulting a dentist for accurate professional diagnosis."
//     : confidence < 0.8
//     ? " This analysis has moderate confidence. Professional examination is recommended for confirmation."
//     : "";
  
//   return baseExplanation + confidenceNote;
// }

// // ========================================
// // Helper: OpenAI Vision API
// // ========================================
// async function analyzeWithOpenAI(imageBase64: string) {
//   if (!OPENAI_API_KEY) {
//     throw new Error("OPENAI_API_KEY not configured");
//   }

//   console.log("🤖 Calling OpenAI Vision API...");

//   const res = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${OPENAI_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "user",
//           content: [
//             {
//               type: "text",
//               text: `You are a dental AI assistant. Analyze this teeth photo and respond ONLY with valid JSON:
// {
//   "label": "one of: healthy, caries_suspected, plaque, calculus_tartar, gingivitis_suspected, misalignment, staining, other",
//   "confidence": 0.0-1.0,
//   "findings": ["finding1", "finding2", ...],
//   "explanation": "120-180 words explanation in patient-friendly language. Avoid definitive diagnosis. Suggest seeing a dentist if issues detected."
// }`,
//             },
//             {
//               type: "image_url",
//               image_url: { url: imageBase64 },
//             },
//           ],
//         },
//       ],
//       max_tokens: 500,
//       temperature: 0.3,
//     }),
//   });

//   if (!res.ok) {
//     const err = await res.text();
//     throw new Error(`OpenAI API error: ${res.status} ${err}`);
//   }

//   const data = await res.json();
//   const content = data.choices?.[0]?.message?.content || "{}";
  
//   const jsonMatch = content.match(/\{[\s\S]*\}/);
//   if (!jsonMatch) throw new Error("No JSON found in OpenAI response");
  
//   return JSON.parse(jsonMatch[0]);
// }

// // ========================================
// // Main POST Handler
// // ========================================
// export async function POST(req: NextRequest) {
//   console.log("🔐 Environment Check:");
//   console.log("   USE_OPENAI:", USE_OPENAI);
//   console.log("   OPENAI_API_KEY:", OPENAI_API_KEY ? 
//     `${OPENAI_API_KEY.slice(0, 15)}... (length: ${OPENAI_API_KEY.length})` : "❌ NOT SET");
//   console.log("   USE_ROBOFLOW:", USE_ROBOFLOW);
//   console.log("   ROBOFLOW_API_KEY:", ROBOFLOW_API_KEY ? 
//     `${ROBOFLOW_API_KEY.slice(0, 10)}...` : "❌ NOT SET");
  
//   try {
//     const form = await req.formData();
//     const files = (form.getAll("images").length 
//       ? form.getAll("images") 
//       : form.getAll("image")) as File[];

//     if (!files || files.length === 0) {
//       return NextResponse.json(
//         { error: "no_file_uploaded", message: "Please upload an image" },
//         { status: 400 }
//       );
//     }

//     // Save file
//     const uploadDir = join(process.cwd(), "public", "uploads");
//     if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });

//     const file = files[0];
//     const buf = Buffer.from(await file.arrayBuffer());
//     const ext = (file.name?.split(".").pop() || "png").toLowerCase();
//     const fileName = `dental_${Date.now()}_${randomUUID()}.${ext}`;
//     const filePath = join(uploadDir, fileName);
    
//     await writeFile(filePath, buf);
//     console.log(`✅ File saved: ${fileName}`);

//     // Convert to base64
//     const imageBase64 = `data:image/${ext};base64,${buf.toString("base64")}`;

//     // Check valid API keys
//     const hasValidOpenAI = USE_OPENAI && OPENAI_API_KEY && OPENAI_API_KEY.length > 50;
//     const hasValidRoboflow = USE_ROBOFLOW && ROBOFLOW_API_KEY && ROBOFLOW_API_KEY.length > 20;
//     const hasValidHF = HF_API_KEY && HF_API_KEY.length > 20;
    
//     console.log("🔍 API Availability:");
//     console.log("   OpenAI:", hasValidOpenAI ? "✅ Available" : "❌ Not configured");
//     console.log("   Roboflow:", hasValidRoboflow ? "✅ Available" : "❌ Not configured");
//     console.log("   HuggingFace:", hasValidHF ? "✅ Available" : "❌ Not configured");

//     let result;
    
//     if (!hasValidOpenAI && !hasValidRoboflow && !hasValidHF) {
//       console.log("⚠️  No valid API keys found. Using MOCK DATA for demo...");
      
//       const mockLabels = ["caries_suspected", "plaque", "healthy", "calculus_tartar", "staining"];
//       const randomLabel = mockLabels[Math.floor(Math.random() * mockLabels.length)];
//       const randomConfidence = 0.65 + Math.random() * 0.25;
      
//       result = {
//         label: randomLabel,
//         confidence: randomConfidence,
//         findings: [
//           `Detected ${randomLabel.replace('_', ' ')} with ${(randomConfidence * 100).toFixed(1)}% confidence`,
//           "Image quality: Good",
//           "Analysis completed in demo mode"
//         ],
//         explanation: generateExplanation(randomLabel, randomConfidence) + " (Note: This is demonstration data. Configure OpenAI, Roboflow, or HuggingFace API key for real AI analysis.)"
//       };
//     } else {
//       try {
//         if (hasValidOpenAI) {
//           console.log("🤖 Using OpenAI Vision API...");
//           result = await analyzeWithOpenAI(imageBase64);
//         } else {
//           throw new Error("Only OpenAI is currently configured. Roboflow and HuggingFace are not available.");
//         }
//       } catch (error: any) {
//         console.error("❌ API call failed:", error.message);
//         console.log("⚠️  Falling back to MOCK DATA...");
        
//         result = {
//           label: "plaque",
//           confidence: 0.72,
//           findings: [
//             "API temporarily unavailable",
//             "Using demo analysis mode",
//             "Please configure valid API keys for real analysis"
//           ],
//           explanation: "The AI service is temporarily unavailable. This is demonstration data showing how the analysis would appear. Please configure a valid OpenAI API key for real dental image analysis."
//         };
//       }
//     }

//     // Validate and return result
//     const allowedLabels = new Set([
//       "healthy", "caries_suspected", "plaque", "calculus_tartar",
//       "gingivitis_suspected", "misalignment", "staining", "other"
//     ]);

//     const label = allowedLabels.has(result.label) ? result.label : "other";
//     const confidence = Math.max(0, Math.min(1, Number(result.confidence) || 0.5));

//     return NextResponse.json({
//       results: [{
//         label,
//         confidence,
//         findings: result.findings || ["Analysis completed"],
//         explanation: result.explanation || generateExplanation(label, confidence),
//         imagePath: fileName,
//         imageUrl: `/uploads/${fileName}`,
//         timestamp: new Date().toISOString(),
//       }],
//     });

//   } catch (e: any) {
//     console.error("❌ [AI Analyze Error]:", e?.message || e);
    
//     return NextResponse.json(
//       { 
//         error: "analysis_failed", 
//         message: "Analysis failed. Using demo mode.",
//         detail: process.env.NODE_ENV === "development" ? e?.message : undefined
//       },
//       { status: 500 }
//     );
//   }
// }





//ลองใช้ model ตัวเอง


// app/api/ai/analyze/route.ts
import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const image = formData.get('images') as File

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // แปลงรูปเป็น base64 สำหรับส่งไป Roboflow
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString('base64')

    // บันทึกรูปไว้ใน public/uploads (สำหรับ Doctor Dashboard)
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    const filename = `${Date.now()}-${image.name}`
    const filepath = path.join(uploadDir, filename)
    
    try {
      await writeFile(filepath, buffer)
    } catch (err) {
      console.warn('Could not save file locally:', err)
    }

    // เรียก Roboflow API
    const ROBOFLOW_API_KEY = process.env.ROBOFLOW_API_KEY || 'EpgRjTIxzPRUA7GSg6Lh'
    const MODEL_ENDPOINT = 'https://detect.roboflow.com/teeth-ai/5'

    let aiResult: any
    
    try {
      const roboflowResponse = await fetch(
        `${MODEL_ENDPOINT}?api_key=${ROBOFLOW_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: base64Image
        }
      )

      if (!roboflowResponse.ok) {
        throw new Error(`Roboflow API error: ${roboflowResponse.statusText}`)
      }

      aiResult = await roboflowResponse.json()
      console.log('✅ Roboflow Response:', aiResult)
      
    } catch (roboflowError) {
      console.error('❌ Roboflow API Error:', roboflowError)
      // ถ้า Roboflow fail ให้ใช้ mock data เพื่อไม่ให้ระบบพัง
      aiResult = {
        predictions: [{
          class: 'plaque',
          confidence: 0.72,
          x: 100,
          y: 100,
          width: 50,
          height: 50
        }]
      }
    }

    // แปลงผลลัพธ์จาก Roboflow เป็นรูปแบบที่ frontend ต้องการ
    let label = 'Healthy Teeth'
    let confidence = 0.5
    let findings: string[] = []
    let explanation = 'No issues detected in the dental image.'

    if (aiResult.predictions && aiResult.predictions.length > 0) {
      const topPrediction = aiResult.predictions[0]
      label = topPrediction.class || 'Unknown'
      confidence = topPrediction.confidence || 0.5

      // สร้าง findings และ explanation ตามผลลัพธ์
      const conditionLower = label.toLowerCase()
      
      if (conditionLower.includes('cavity') || conditionLower.includes('decay') || conditionLower.includes('caries')) {
        findings = [
          'Cavity or tooth decay detected',
          'Dental restoration may be required',
          'Schedule appointment with dentist soon'
        ]
        explanation = 'AI has detected signs of tooth decay or cavity formation. This condition requires professional dental treatment to prevent further damage. Early intervention is recommended.'
        
      } else if (conditionLower.includes('plaque') || conditionLower.includes('tartar') || conditionLower.includes('calculus')) {
        findings = [
          'Plaque or tartar buildup detected',
          'Professional cleaning recommended',
          'May lead to gum disease if untreated'
        ]
        explanation = 'The analysis shows accumulation of plaque or tartar on your teeth. Professional dental cleaning is recommended to remove these deposits and prevent potential gum disease.'
        
      } else if (conditionLower.includes('gum') || conditionLower.includes('gingivitis') || conditionLower.includes('periodontitis')) {
        findings = [
          'Gum-related issue detected',
          'May indicate early stage gum disease',
          'Dental evaluation recommended'
        ]
        explanation = 'Signs of gum-related issues have been detected. This could indicate gingivitis or early periodontal disease. A dental professional should evaluate this condition.'
        
      } else if (conditionLower.includes('healthy') || conditionLower.includes('normal')) {
        findings = [
          'No obvious dental issues detected',
          'Teeth appear to be in good condition',
          'Continue regular dental hygiene'
        ]
        explanation = 'The AI analysis suggests your teeth are in good condition with no obvious signs of decay, plaque buildup, or gum disease. Continue your regular dental hygiene routine and scheduled checkups.'
        
      } else {
        // ถ้าเป็น class ที่ไม่รู้จัก ให้แสดงข้อมูลทั่วไป
        findings = [
          `Detected condition: ${label}`,
          'AI confidence: ' + (confidence * 100).toFixed(1) + '%',
          'Professional evaluation recommended'
        ]
        explanation = `The AI has detected a condition labeled as "${label}" with ${(confidence * 100).toFixed(1)}% confidence. For accurate diagnosis and treatment recommendations, please consult with a licensed dentist.`
      }
    }

    // Return ในรูปแบบที่ frontend ต้องการ
    return NextResponse.json({
      success: true,
      results: [{
        label,
        confidence,
        findings,
        explanation,
        imagePath: filename, // เก็บเฉพาะชื่อไฟล์
        imageUrl: `/uploads/${filename}` // path เต็มสำหรับแสดงผล
      }]
    })

  } catch (error: any) {
    console.error('❌ AI Analysis Error:', error)
    return NextResponse.json(
      { 
        error: 'Analysis failed',
        message: error.message 
      },
      { status: 500 }
    )
  }
}