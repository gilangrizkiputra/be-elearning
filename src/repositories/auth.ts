import { prisma } from '../utils/db'

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } })
}

export function createUser(data: {
  name: string
  email: string
  password: string
  role: 'user' | 'teacher' | 'admin'
}) {
  return prisma.user.create({ data })
}
