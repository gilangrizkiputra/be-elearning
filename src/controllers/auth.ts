import { Request, Response, NextFunction } from 'express'
import * as authService from '../services/auth'

export async function register(req: Request, res: Response, _next: NextFunction) {
  const { name, email, password } = req.body
  const result = await authService.registerUser(name, email, password)
  res.status(201).json({ data: result })
}

export async function login(req: Request, res: Response, _next: NextFunction) {
  const { email, password } = req.body
  const result = await authService.loginUser(email, password)
  res.json({ data: result })
}
