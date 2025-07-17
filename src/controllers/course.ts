import { Request, Response, NextFunction } from 'express'
import * as courseService from '../services/course'

export async function createCourse(req: Request, res: Response, _next: NextFunction) {
  const user = res.locals.user

  const { title, description, category, price, level, thumbnail, status } = req.body

  const result = await courseService.createCourse(user.id, {
    title,
    description,
    category,
    price,
    level,
    thumbnail,
    status,
  })

  res.status(201).json({
    message: 'Success create course',
    data: result,
  })
}
