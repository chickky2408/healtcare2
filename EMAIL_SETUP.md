# Email Setup Guide - Gmail Configuration

เพื่อให้ระบบส่ง email ได้ คุณต้องตั้งค่า Gmail App Password ดังนี้:

## ขั้นตอนการสร้าง Gmail App Password

### 1. เปิด 2-Step Verification (ถ้ายังไม่ได้เปิด)
1. ไปที่ https://myaccount.google.com/security
2. ที่ส่วน "Signing in to Google" เลือก "2-Step Verification"
3. ทำตามขั้นตอนเพื่อเปิดใช้งาน 2-Step Verification

### 2. สร้าง App Password
1. ไปที่ https://myaccount.google.com/apppasswords
2. เข้าสู่ระบบด้วย Google account ของคุณ
3. ที่ "Select app" เลือก "Mail"
4. ที่ "Select device" เลือก "Other (Custom name)"
5. ใส่ชื่อ เช่น "HealthCare+ App"
6. คลิก "Generate"
7. **คัดลอก App Password ที่ได้** (จะเป็น 16 ตัวอักษร ไม่มีช่องว่าง)

### 3. อัพเดทไฟล์ .env

แก้ไขไฟล์ `.env` ใน folder `healthcare2`:

```env
DATABASE_URL="postgres://..."

# Email Configuration for Password Reset
EMAIL_USER=your-email@gmail.com          # ← เปลี่ยนเป็น Gmail ของคุณ
EMAIL_PASSWORD=your-16-digit-app-password # ← เปลี่ยนเป็น App Password ที่ได้
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 4. Restart Development Server

หลังจากแก้ไข .env แล้ว ต้อง restart dev server:

```bash
# กด Ctrl+C เพื่อหยุด server
# จากนั้นรันใหม่
cd healthcare2
npm run dev
```

## ทดสอบการส่ง Email

1. เปิด http://localhost:3001/login
2. คลิก "Forgot Password?"
3. ใส่ email ที่ลงทะเบียนไว้
4. คลิก "Send Reset Link"
5. ตรวจสอบ email ของคุณ (รวมถึง Spam folder ด้วย)

## Troubleshooting

### ถ้าไม่ได้รับ email:

1. **ตรวจสอบ console log** - ดูว่ามี error หรือไม่
2. **ตรวจสอบ Spam folder** - email อาจอยู่ใน Spam
3. **ตรวจสอบ App Password** - ให้แน่ใจว่าคัดลอกถูกต้อง (16 ตัว ไม่มีช่องว่าง)
4. **ตรวจสอบ EMAIL_USER** - ต้องเป็น Gmail ที่มี 2-Step Verification เปิดอยู่

### Error: "Invalid login"
- App Password อาจผิด
- 2-Step Verification ยังไม่เปิด
- สร้าง App Password ใหม่อีกครั้ง

### Email ไม่ส่ง แต่ไม่มี error
- ตรวจสอบว่า EMAIL_USER และ EMAIL_PASSWORD ถูกต้อง
- Restart dev server หลังแก้ไข .env

## Alternative: ใช้ Mailtrap สำหรับ Testing (ไม่ส่ง email จริง)

ถ้าต้องการทดสอบโดยไม่ส่ง email จริง ใช้ Mailtrap:

1. สมัครที่ https://mailtrap.io (ฟรี)
2. สร้าง inbox
3. คัดลอก SMTP credentials
4. แก้ไข `lib/email.ts`:

```typescript
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'your-mailtrap-user',
      pass: 'your-mailtrap-password'
    }
  })
}
```

## สรุป

✅ เปิด 2-Step Verification
✅ สร้าง App Password
✅ แก้ไข .env file
✅ Restart dev server
✅ ทดสอบส่ง email

หากมีปัญหา กรุณาตรวจสอบ console log และ error messages
