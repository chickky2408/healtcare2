const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('🔄 Migrating payment status from VERIFIED to SUCCESSFUL...')

    // เปลี่ยน VERIFIED เป็น SUCCESSFUL ด้วย raw SQL
    await prisma.$executeRaw`
      UPDATE "Payment"
      SET status = 'SUCCESSFUL'
      WHERE status = 'VERIFIED'
    `

    console.log('✅ Migration completed successfully!')
    console.log('All VERIFIED payments are now SUCCESSFUL')

  } catch (error) {
    console.error('❌ Error migrating payments:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
