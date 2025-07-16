import { Application, Router } from 'express'
import root from './root'
import user from './user'

export default (app: Application) => {
  const router = Router()
  app.use('/', router)

  root(app)
  user(app)
}
