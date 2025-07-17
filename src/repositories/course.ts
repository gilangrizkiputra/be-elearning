import { prisma } from '../utils/db'

export function createCourse(data: {
  title: string
  description: string
  category: string
  price: number
  level: 'beginner' | 'intermediate' | 'advanced'
  thumbnail?: string | null
  status: 'draft' | 'publish'
  made_by: string
}) {
  return prisma.course.create({
    data: {
      ...data,
      thumbnail: data.thumbnail ?? null,
    },
  })
}
