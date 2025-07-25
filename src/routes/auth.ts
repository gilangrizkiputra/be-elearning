import { Router } from 'express'
import { Application } from 'express-serve-static-core'
import * as authController from '../controllers/auth'
import * as authMiddleware from '../middlewares/auth'
import { validate } from '../middlewares/validate'
import * as authValidation from '../schemas/auth'

export default (app: Application) => {
  const router = Router()
  app.use('/auth', router)

  router.post('/register', validate(authValidation.registerSchema), authController.register)

  router.post('/login', validate(authValidation.loginSchema), authController.login)

  router.get('/me', authMiddleware.isAuthorized, authController.getDetailUser)

  router.put(
    '/me',
    authMiddleware.isAuthorized,
    validate(authValidation.updateProfileSchema),
    authController.updateProfile
  )

  router.post('/logout', authMiddleware.isAuthorized, authController.logout)
}
