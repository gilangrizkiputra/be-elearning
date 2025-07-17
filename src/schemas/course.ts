import { z } from 'zod'

export const createCourseSchema = z.object({
  title: z.string().min(3, 'Judul minimal 3 karakter'),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  category: z.string().min(3),
  price: z.number().min(0, 'Harga tidak boleh negatif'),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  thumbnail: z.string().url('URL thumbnail tidak valid').optional().nullable(),
  status: z.enum(['draft', 'publish']),
})
