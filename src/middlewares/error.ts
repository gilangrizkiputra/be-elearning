import { Application, Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { HttpError } from '../utils/error.js'

export default (app: Application) => {
  app.use(notFound)
  app.use(errorHandler)
}

function notFound(req: Request, _res: Response, next: NextFunction) {
  const notFoundError = new HttpError(404, `Route not found - ${req.originalUrl}`)
  next(notFoundError)
}

function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: err.issues.map((e) => ({
        path: e.path,
        message: e.message,
      })),
    })
  }

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  if (err instanceof Error) {
    return res.status(500).json({ message: err.message })
  }

  res.status(500).json({ message: 'Internal Server Error' })
}
