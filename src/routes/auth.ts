import { Router } from 'express'
import { Application } from 'express-serve-static-core'
import * as authController from '../controllers/auth'
import { validate } from '../middlewares/validate'
import * as authValidation from '../schemas/auth'

export default (app: Application) => {
  const router = Router()
  app.use('/auth', router)

  router.post('/register', validate(authValidation.registerSchema), authController.register)
  router.post('/login', validate(authValidation.loginSchema), authController.login)
}
