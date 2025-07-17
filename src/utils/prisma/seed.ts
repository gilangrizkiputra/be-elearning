import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10)
  const teacherPassword = await bcrypt.hash('teacher123', 10)
  const userPassword = await bcrypt.hash('user123', 10)

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
    },
  })

  await prisma.user.upsert({
    where: { email: 'teacher@example.com' },
    update: {},
    create: {
      name: 'Teacher',
      email: 'teacher@example.com',
      password: teacherPassword,
      role: 'teacher',
    },
  })

  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      name: 'User',
      email: 'user@example.com',
      password: userPassword,
      role: 'user',
    },
  })
}

main()
  .then(() => console.log('Seeder berhasil dijalankan!'))
  .catch((e) => console.error('Seeder gagal:', e))
  .finally(() => prisma.$disconnect())
