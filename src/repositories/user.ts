import { prisma } from '../utils/db'

export function findAllUsers() {
  return prisma.user.findMany()
}
