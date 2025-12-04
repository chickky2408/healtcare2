import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  try {
    // ข้อมูลแอดมิน
    const adminEmail = 'admin@healthcare.com'
    const adminPassword = 'Admin@123456'
    const adminName = 'Admin Healthcare'

    // เช็คว่ามีแอดมินอยู่แล้วหรือไม่
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: adminEmail }
    })

    if (existingAdmin) {
      console.log('✅ Admin already exists!')
      console.log('Email:', adminEmail)
      console.log('Password:', adminPassword)
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    // สร้างแอดมิน
    const admin = await prisma.admin.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: adminName
      }
    })

    console.log('✅ Admin created successfully!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📧 Email:', adminEmail)
    console.log('🔑 Password:', adminPassword)
    console.log('👤 Name:', adminName)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('\n⚠️  Please save these credentials!')

  } catch (error) {
    console.error('❌ Error creating admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
