import { Request, Response, NextFunction } from 'express'
import * as userService from '../services/user'

export async function getUsers(req: Request, res: Response, _next: NextFunction) {
  const users = await userService.getUsers()
  res.json({ data: users })
}

export async function createUser(req: Request, res: Response, _next: NextFunction) {
  const { name, email } = req.body
  const user = await userService.registerUser(name, email)
  res.status(201).json({ data: user })
}
