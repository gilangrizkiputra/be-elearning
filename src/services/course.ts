import * as courseRepository from '../repositories/course'

export async function createCourse(
  userId: string,
  input: {
    title: string
    description: string
    category: string
    price: number
    level: 'beginner' | 'intermediate' | 'advanced'
    thumbnail: string
    status: 'draft' | 'publish'
  }
) {
  const course = await courseRepository.createCourse({
    ...input,
    made_by: userId,
  })

  return {
    id: course.id,
    title: course.title,
    category: course.category,
    price: course.price,
    level: course.level,
    thumbnail: course.thumbnail,
    status: course.status,
  }
}
