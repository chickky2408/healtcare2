import sys
import json
import requests

# รับ path ของภาพจาก argument
image_path = sys.argv[1]

# ตั้งค่า Roboflow
model_url = "https://detect.roboflow.com/teeth-ai/2"
api_key = "EpgRjTIxzPRUA7GSg6Lh"

# ส่งภาพเข้า Roboflow เพื่อวิเคราะห์
with open(image_path, "rb") as image_file:
    response = requests.post(
        f"{model_url}?api_key={api_key}",
        files={"file": image_file},
        data={"confidence": 50, "overlap": 30}
    )

# จัดการผลลัพธ์
try:
    result_data = response.json()
    if result_data.get("predictions"):
        prediction = result_data["predictions"][0]
        label = prediction.get("class", "ไม่พบการจำแนก")
        confidence = round(prediction.get("confidence", 0.0), 2)
    else:
        label = "No abnormalities found"
        confidence = 0.0

    print(json.dumps({
        "label": label,
        "confidence": confidence
    }))

    # Removed undefined variable 'result'
    # print(json.dumps(result))

except Exception as e:
    print(json.dumps({
        "label": "Error",
        "confidence": 0.0,
        "message": str(e)
    }))


