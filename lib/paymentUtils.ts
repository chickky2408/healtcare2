import { TreatmentType } from '@prisma/client'

// ข้อมูลบัญชีธนาคารสำหรับการโอนเงิน
export const BANK_DETAILS = {
  bankName: 'SCB (ธนาคารไทยพาณิชย์)',
  accountNumber: '416-0305433',
  accountName: 'นางสาวพิมมาดา มาลัย'
}

// กำหนดราคาตามประเภทการรักษา
export const TREATMENT_PRICES: Record<TreatmentType, number> = {
  VIDEO_CALL: 500,      // ค่าปรึกษาหมอออนไลน์ 500 บาท
  CLEANING: 1500,       // ทำความสะอาดฟัน 1,500 บาท
  ORTHODONTIC: 3000,    // จัดฟัน 3,000 บาท (ค่าเริ่มต้น)
  AI_DIAGNOSIS: 300,    // วิเคราะห์ฟันด้วย AI 300 บาท
  SURGERY: 5000,        // ผ่าตัด 5,000 บาท (ค่าเริ่มต้น)
}

// คำนวณราคาตามประเภทการรักษา
export function calculatePrice(treatmentType: TreatmentType): number {
  return TREATMENT_PRICES[treatmentType] || 0
}

// Format ราคาเป็นสกุลเงินไทย
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB'
  }).format(amount)
}

// ตรวจสอบประเภทไฟล์รูปภาพ
export function isValidImageFile(filename: string): boolean {
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp']
  const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'))
  return validExtensions.includes(ext)
}
