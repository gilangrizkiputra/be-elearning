import { Router } from 'express'
import { Application } from 'express-serve-static-core'
import * as courseController from '../controllers/course'
import * as authMiddleware from '../middlewares/auth'
import { validate } from '../middlewares/validate'
import * as courseValidation from '../schemas/course'

export default (app: Application) => {
  const router = Router()
  app.use('/course', router)

  router.post(
    '/create',
    authMiddleware.isAuthorized,
    authMiddleware.isTeacherOrAdmin,
    validate(courseValidation.createCourseSchema),
    courseController.createCourse
  )
}
