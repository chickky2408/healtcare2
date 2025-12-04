// test-openai.js - ทดสอบ OpenAI Vision API โดยตรง
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const TEST_IMAGE_PATH = "./public/uploads/test-image.jpg"; // ใช้รูปเดียวกับที่ทดสอบ Roboflow

async function testOpenAIVision() {
  console.log("🚀 Starting OpenAI Vision API Test...\n");

  // 1. ตรวจสอบ config
  console.log("📋 Configuration:");
  console.log(`   API Key: ${OPENAI_API_KEY ? OPENAI_API_KEY.slice(0, 15) + '...' : '❌ NOT SET'}`);
  console.log(`   Test Image: ${TEST_IMAGE_PATH}\n`);

  if (!OPENAI_API_KEY) {
    console.error("❌ Error: OPENAI_API_KEY not found in .env.local");
    return;
  }

  // 2. อ่านไฟล์รูป
  if (!fs.existsSync(TEST_IMAGE_PATH)) {
    console.error(`❌ Error: Image file not found at ${TEST_IMAGE_PATH}`);
    console.log("💡 Tip: Make sure you have a test image at this path");
    return;
  }

  const imageBuffer = fs.readFileSync(TEST_IMAGE_PATH);
  const base64Image = imageBuffer.toString('base64');

  console.log(`✅ Image loaded (${(imageBuffer.length / 1024).toFixed(2)} KB)\n`);

  // 3. เรียก OpenAI Vision API
  console.log("📡 Calling OpenAI Vision API...\n");

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `You are a dental AI assistant. Analyze this teeth photo and respond ONLY with valid JSON (no markdown, no code blocks).

Required JSON format:
{
  "label": "one of: healthy, caries_suspected, plaque, calculus_tartar, gingivitis_suspected, misalignment, staining, other",
  "confidence": 0.0-1.0,
  "findings": ["bullet point 1", "bullet point 2", ...],
  "explanation": "120-180 words patient-friendly explanation. Avoid definitive diagnosis. Suggest seeing dentist if needed."
}

Analyze the dental image carefully and provide your assessment.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              }
            ]
          }
        ],
        max_tokens: 500,
        temperature: 0.3
      })
    });

    console.log(`📬 Response Status: ${response.status} ${response.statusText}\n`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error Response:");
      console.error(errorText);
      return;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '{}';

    console.log("📊 OpenAI Raw Response:");
    console.log(content);
    console.log("\n");

    // 4. Parse JSON
    try {
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const result = JSON.parse(cleanContent);

      console.log("✅ SUCCESS! Parsed Result:");
      console.log(JSON.stringify(result, null, 2));
      console.log("\n");

      console.log("📋 Summary:");
      console.log(`   Label: ${result.label}`);
      console.log(`   Confidence: ${(result.confidence * 100).toFixed(1)}%`);
      console.log(`   Findings: ${result.findings?.length || 0} items`);
      console.log(`   Explanation: ${result.explanation ? 'Yes' : 'No'}`);

    } catch (parseError) {
      console.error("❌ Failed to parse JSON response:");
      console.error(parseError.message);
    }

  } catch (error) {
    console.error("\n❌ Error during API call:");
    console.error(error.message);
    console.error("\nFull error:", error);
  }
}

// เรียกใช้ function
testOpenAIVision().catch(console.error);
