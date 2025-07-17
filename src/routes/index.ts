import { Application, Router } from 'express'
import root from './root'
import auth from './auth'
import course from './course'

export default (app: Application) => {
  const router = Router()
  app.use('/', router)

  root(app)
  auth(app)
  course(app)
}
