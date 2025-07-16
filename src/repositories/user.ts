import { prisma } from '../utils/db'

export function findAllUsers() {
  return prisma.user.findMany()
}

export function createUser(data: { name: string; email: string }) {
  return prisma.user.create({ data })
}
