// test-roboflow.js - ทดสอบ Roboflow API โดยตรง
// วิธีใช้: node test-roboflow.js

const fs = require('fs');
const path = require('path');

// ⚙️ ใส่ค่าของคุณที่นี่
const ROBOFLOW_API_KEY = "EpgRjTIxzPqsq03PG7nM4iGc5qo2"
const ROBOFLOW_MODEL = "dental-ebfyf/7"; // model ที่ใช้
const TEST_IMAGE_PATH = "./public/uploads/test-image.jpg"; // path ของรูปทดสอบ

async function testRoboflowAPI() {
  console.log("🚀 Starting Roboflow API Test...\n");

  // 1. ตรวจสอบ config
  console.log("📋 Configuration:");
  console.log(`   API Key: ${ROBOFLOW_API_KEY.slice(0, 10)}...`);
  console.log(`   Model: ${ROBOFLOW_MODEL}`);
  console.log(`   Test Image: ${TEST_IMAGE_PATH}\n`);

  // 2. อ่านไฟล์รูป
  if (!fs.existsSync(TEST_IMAGE_PATH)) {
    console.error(`❌ Error: Image file not found at ${TEST_IMAGE_PATH}`);
    console.log("💡 Tip: Download a sample dental image and save it as test-image.jpg");
    return;
  }

  const imageBuffer = fs.readFileSync(TEST_IMAGE_PATH);
  const base64Image = imageBuffer.toString('base64');
  const imageDataURL = `data:image/jpeg;base64,${base64Image}`;

  console.log(`✅ Image loaded (${(imageBuffer.length / 1024).toFixed(2)} KB)\n`);

  // 3. เรียก Roboflow API
  const apiUrl = `https://detect.roboflow.com/${ROBOFLOW_MODEL}?api_key=${ROBOFLOW_API_KEY}`;
  
  console.log("📡 Calling Roboflow API...");
  console.log(`   URL: ${apiUrl.replace(ROBOFLOW_API_KEY, 'HIDDEN')}\n`);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: imageDataURL
    });

    console.log(`📬 Response Status: ${response.status} ${response.statusText}\n`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error Response:");
      console.error(errorText);
      return;
    }

    const data = await response.json();
    
    // 4. แสดงผลลัพธ์
    console.log("📊 API Response:");
    console.log(JSON.stringify(data, null, 2));
    console.log("\n");

    // 5. วิเคราะห์ผลลัพธ์
    if (!data.predictions || data.predictions.length === 0) {
      console.log("⚠️  WARNING: No predictions returned!");
      console.log("\n🔍 Possible reasons:");
      console.log("   1. Model might not be trained yet");
      console.log("   2. Image format/quality issue");
      console.log("   3. Model doesn't recognize anything in the image");
      console.log("   4. API key or model name incorrect\n");
      
      console.log("💡 Suggestions:");
      console.log("   - Try uploading this image directly to Roboflow website");
      console.log("   - Check if the model is 'Active' in Roboflow dashboard");
      console.log("   - Verify model version number (currently using: 7)");
    } else {
      console.log("✅ SUCCESS! Predictions found:");
      data.predictions.forEach((pred, i) => {
        console.log(`\n   ${i + 1}. ${pred.class}`);
        console.log(`      Confidence: ${(pred.confidence * 100).toFixed(2)}%`);
        console.log(`      Bounding Box: [${pred.x}, ${pred.y}, ${pred.width}, ${pred.height}]`);
      });
    }

  } catch (error) {
    console.error("\n❌ Error during API call:");
    console.error(error.message);
    console.error("\nFull error:", error);
  }
}

// เรียกใช้ function
testRoboflowAPI().catch(console.error);