import { Request, Response, NextFunction } from 'express'
import { HttpError } from '../utils/error.js'
import { verifyTokenAndUser } from '../services/auth.js'

export async function isAuthorized(req: Request, res: Response, next: NextFunction) {
  const authorization = req.get('authorization')

  if (!authorization) {
    throw new HttpError(401, 'Missing authorization header')
  }

  const [type, token] = authorization.split(' ')

  if (type.toLowerCase() !== 'bearer') {
    throw new HttpError(401, 'Invalid authorization token')
  }

  const user = await verifyTokenAndUser(token)
  res.locals.user = user

  next()
}

export async function isAdmin(_req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user

  if (!user || user.role !== 'ADMIN') {
    throw new HttpError(403, 'Hanya admin yang bisa mengakses fitur ini')
  }

  next()
}
