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

#     # Removed undefined variable 'result'
#     # print(json.dumps(result))

# except Exception as e:
#     print(json.dumps({
#         "label": "Error",
#         "confidence": 0.0,
#         "message": str(e)
#     }))




#new code 

#!/usr/bin/env python
import sys, os, json

def die(code, **kw):
    print(json.dumps(kw), flush=True)
    sys.exit(code)

if len(sys.argv) < 2:
    die(3, error="no_image_path")

image_path = sys.argv[1]
if not os.path.exists(image_path):
    die(4, error="image_not_found", path=image_path)

try:
    from roboflow import Roboflow
except Exception as e:
    die(2, error="py_missing_module", detail=str(e))

api_key = os.environ.get("ROBOFLOW_API_KEY")
project_id = os.environ.get("ROBOFLOW_PROJECT", "teeth-ai")  # เปลี่ยนตามของคุณ
version_num = int(os.environ.get("ROBOFLOW_VERSION", "2"))   # เปลี่ยนตามของคุณ

if not api_key:
    die(5, error="no_api_key", hint="Set ROBOFLOW_API_KEY in .env.local")

try:
    rf = Roboflow(api_key=api_key)
    project = rf.workspace().project(project_id)
    model = project.version(version_num).model

    # ปรับ confidence/overlap ตามต้องการ
    pred = model.predict(image_path, confidence=40, overlap=30).json()
except Exception as e:
    die(6, error="roboflow_call_failed", detail=str(e))

# เลือกผลที่คอนฟิเดนซ์สูงสุด
best_label, best_conf = "unknown", 0.0
try:
    preds = pred.get("predictions", [])
    if preds:
        top = max(preds, key=lambda x: x.get("confidence", 0.0))
        best_label = top.get("class", "unknown")
        best_conf = float(top.get("confidence", 0.0))
except Exception as e:
    die(7, error="parse_predictions_failed", detail=str(e), raw=pred)

print(json.dumps({"label": best_label, "confidence": best_conf}), flush=True)