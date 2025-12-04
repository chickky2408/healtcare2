const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('🔄 Step 1: Adding SUCCESSFUL to PaymentStatus enum...')

    // เพิ่ม SUCCESSFUL ใน enum
    await prisma.$executeRawUnsafe(`
      ALTER TYPE "PaymentStatus" ADD VALUE IF NOT EXISTS 'SUCCESSFUL'
    `)

    console.log('✅ Step 1 completed: SUCCESSFUL added to enum')

    console.log('🔄 Step 2: Migrating VERIFIED payments to SUCCESSFUL...')

    // เปลี่ยน VERIFIED เป็น SUCCESSFUL
    await prisma.$executeRaw`
      UPDATE "Payment"
      SET status = 'SUCCESSFUL'::text::"PaymentStatus"
      WHERE status = 'VERIFIED'::text::"PaymentStatus"
    `

    console.log('✅ Step 2 completed: All VERIFIED payments are now SUCCESSFUL')

    console.log('🔄 Step 3: Checking remaining VERIFIED values...')

    const verifiedCount = await prisma.$executeRaw`
      SELECT COUNT(*) FROM "Payment" WHERE status = 'VERIFIED'::text::"PaymentStatus"
    `

    console.log('Remaining VERIFIED payments:', verifiedCount)

    console.log('\n✅ Migration completed successfully!')

  } catch (error) {
    console.error('❌ Error:', error.message)
    console.error('Full error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
