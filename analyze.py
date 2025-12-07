# import sys
# import json
# import requests

# # รับ path ของภาพจาก argument
# image_path = sys.argv[1]

# # ตั้งค่า Roboflow
# model_url = "https://detect.roboflow.com/teeth-ai/2"
# api_key = "EpgRjTIxzPRUA7GSg6Lh"

# # ส่งภาพเข้า Roboflow เพื่อวิเคราะห์
# with open(image_path, "rb") as image_file:
#     response = requests.post(
#         f"{model_url}?api_key={api_key}",
#         files={"file": image_file},
#         data={"confidence": 50, "overlap": 30}
#     )

# # จัดการผลลัพธ์
# try:
#     result_data = response.json()
#     if result_data.get("predictions"):
#         prediction = result_data["predictions"][0]
#         label = prediction.get("class", "ไม่พบการจำแนก")
#         confidence = round(prediction.get("confidence", 0.0), 2)
#     else:
#         label = "No abnormalities found"
#         confidence = 0.0

#     print(json.dumps({
#         "label": label,
#         "confidence": confidence
#     }))

    

# except Exception as e:
#     print(json.dumps({
#         "label": "Error",
#         "confidence": 0.0,
#         "message": str(e)
#     }))




# #new code 
# # analyze.py
# import sys, os, json, random
# from typing import List, Dict, Any

# def die(code: int, **kw):
#     print(json.dumps(kw), flush=True)
#     sys.exit(code)

# # --------- รับอาร์กิวเมนต์เป็นรูปหลายไฟล์ ----------
# if len(sys.argv) < 2:
#     die(3, error="no_image_path")

# image_paths: List[str] = sys.argv[1:]
# for p in image_paths:
#     if not os.path.exists(p):
#         die(4, error="image_not_found", path=p)

# # --------- เรียก Roboflow เพื่อตรวจจับ/จำแนก ----------
# try:
#     from roboflow import Roboflow
# except Exception as e:
#     die(2, error="py_missing_module", detail=str(e))

# api_key = os.environ.get("ROBOFLOW_API_KEY")
# project_id = os.environ.get("ROBOFLOW_PROJECT", "teeth-ai")     # ปรับตามโปรเจกต์
# version_num = int(os.environ.get("ROBOFLOW_VERSION", "2"))      # ปรับตามเวอร์ชัน
# rf_conf = int(os.environ.get("ROBOFLOW_CONFIDENCE", "40"))      # 0-100
# rf_overlap = int(os.environ.get("ROBOFLOW_OVERLAP", "30"))      # 0-100

# if not api_key:
#     die(5, error="no_api_key", hint="Set ROBOFLOW_API_KEY in .env.local")

# try:
#     rf = Roboflow(api_key=api_key)
#     project = rf.workspace().project(project_id)
#     model = project.version(version_num).model
# except Exception as e:
#     die(6, error="roboflow_init_failed", detail=str(e))

# def run_roboflow(img_path: str) -> Dict[str, Any]:
#     try:
#         pred = model.predict(img_path, confidence=rf_conf, overlap=rf_overlap).json()
#     except Exception as e:
#         return {"label":"unknown","confidence":0.0,"error":"roboflow_call_failed","detail":str(e)}
#     preds = pred.get("predictions", [])
#     if preds:
#         top = max(preds, key=lambda x: x.get("confidence", 0.0))
#         return {
#             "label": top.get("class", "unknown"),
#             "confidence": float(top.get("confidence", 0.0)),
#             "findings": [{"class": p.get("class"), "confidence": float(p.get("confidence", 0.0))} for p in preds],
#         }
#     return {"label":"unknown","confidence":0.0,"findings":[]}

# # ---------  เรียก Med-Gemma ----------

# USE_MEDGEMMA = os.environ.get("USE_MEDGEMMA", "0") == "1"
# MEDGEMMA_MODEL = os.environ.get("MEDGEMMA_MODEL_ID", "google/med-gemma-2b-it")
# MAX_TOKENS = int(os.environ.get("MEDGEMMA_MAX_NEW_TOKENS", "220"))

# gen = None
# if USE_MEDGEMMA:
#     try:
#         from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
#         import torch
#         tok = AutoTokenizer.from_pretrained(MEDGEMMA_MODEL)
#         model = AutoModelForCausalLM.from_pretrained(
#             MEDGEMMA_MODEL,
#             torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
#             device_map="auto",
#             low_cpu_mem_usage=True
#         )
#         gen = pipeline("text-generation", model=model, tokenizer=tok, device=0 if torch.cuda.is_available() else -1)
#     except Exception as e:
#         # ถ้าโหลดไม่ได้ก็ยังคืนผลลัพธ์ Roboflow ได้
#         gen = None

# def explain_with_medgemma(label: str, conf: float, findings: List[Dict[str, Any]]) -> str:
#     if gen is None:
#         # fallback คำอธิบายเรียบๆ
#         base = f"The system detected '{label}' with confidence {conf:.2f}. Consider seeing a dentist for confirmation."
#         return base
#     findings_text = "\n".join([f"- {f['class']}: {f['confidence']:.2f}" for f in findings[:6]]) or "- (no additional findings)"
#     prompt = f"""You are a medical assistant specialized in dental health.
# Write a concise, patient-friendly explanation in English (120-180 words).
# Avoid definitive diagnosis. Suggest professional evaluation when appropriate.

# Prediction: {label}
# Confidence: {conf:.2f}
# Detected findings:
# {findings_text}

# Write:
# 1) What this likely means in plain language.
# 2) Possible causes and red flags that need dental visit.
# 3) Simple oral-care advice.
# """
#     out = gen(prompt, max_new_tokens=MAX_TOKENS, do_sample=False)[0]["generated_text"]
#     return out[len(prompt):].strip() if out.startswith(prompt) else out.strip()

# # --------- รวมผลลัพธ์ทั้งหมด ----------
# results = []
# for p in image_paths:
#     r = run_roboflow(p)
#     label = r.get("label", "unknown")
#     conf = float(r.get("confidence", 0.0))
#     findings = r.get("findings", [])
#     explanation = explain_with_medgemma(label, conf, findings) if USE_MEDGEMMA else None
#     results.append({
#         "label": label,
#         "confidence": conf,
#         "imagePath": p,
#         "explanation": explanation
#     })

# print(json.dumps({"results": results}), flush=True)





import sys, os, json, base64
from typing import List, Dict, Any
import requests

def die(code: int, **kw):
    print(json.dumps(kw), flush=True)
    sys.exit(code)

image_paths: List[str] = sys.argv[1:]
if not image_paths:
    die(3, error="no_image_path")

for p in image_paths:
    if not os.path.exists(p):
        die(4, error="image_not_found", path=p)

# Roboflow detection (optional)
def run_roboflow(img_path: str) -> Dict[str, Any]:
    return {"label": "unknown", "confidence": 0.0, "findings": []}  # stubbed if unused

# Med-Gemma via Hugging Face
HF_API_KEY = os.environ.get("HF_API_KEY")
MODEL_ID = os.environ.get("MEDGEMMA_MODEL_ID", "google/medgemma-4b-it")
MAX_TOKENS = int(os.environ.get("MEDGEMMA_MAX_NEW_TOKENS", "220"))

def explain_with_medgemma(image_path: str) -> Dict[str, Any]:
    if not HF_API_KEY:
        return {"label": "unknown", "confidence": 0.0, "error": "missing_api_key"}

    try:
        with open(image_path, "rb") as f:
            b64 = f.read()
        ext = image_path.split(".")[-1].lower()
        image_b64 = f"data:image/{ext};base64,{base64.b64encode(b64).decode()}"

        prompt = """
You are a dental assistant. Analyze the provided teeth photo and respond ONLY with strict JSON (no prose).
The JSON schema is:
{
  "label": "one of: healthy, caries_suspected, plaque, calculus_tartar, gingivitis_suspected, misalignment, other",
  "confidence": 0.0-1.0,
  "findings": [ "bullet point", ... ],
  "explanation": "120-180 words, patient-friendly, avoid definitive diagnosis, suggest seeing a dentist if needed"
}
"""

        res = requests.post(
            f"https://api-inference.huggingface.co/models/{MODEL_ID}",
            headers={"Authorization": f"Bearer {HF_API_KEY}"},
            json={"inputs": {"image": image_b64, "prompt": prompt}, "parameters": {"max_new_tokens": MAX_TOKENS}}
        )
        res.raise_for_status()
        data = res.json()
        text = data[0]["generated_text"] if isinstance(data, list) else str(data)
        json_start = text.rfind("{")
        if json_start < 0:
            raise ValueError("No JSON found in response")
        parsed = json.loads(text[json_start:])
        return parsed

    except Exception as e:
        return {
            "label": "unknown",
            "confidence": 0.0,
            "error": "medgemma_api_error",
            "detail": str(e),
            "explanation": "Sorry, the AI couldn't analyze this image. Please try again or use a clearer photo."
        }

results = []
for p in image_paths:
    r = explain_with_medgemma(p)
    results.append({
        "label": r.get("label", "unknown"),
        "confidence": r.get("confidence", 0.0),
        "imagePath": p,
        "explanation": r.get("explanation"),
        "findings": r.get("findings", [])
    })

print(json.dumps({"results": results}), flush=True)
