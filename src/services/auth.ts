import bcrypt from 'bcrypt'
import { HttpError } from '../utils/error'
import * as authRepository from '../repositories/auth'
import { verifyToken, generateToken } from '../utils/jwt'
import { Role } from '@prisma/client'

export async function registerUser(name: string, email: string, password: string) {
  const existing = await authRepository.findUserByEmail(email)
  if (existing) throw new HttpError(400, 'Email sudah terdaftar')

  const hashed = await bcrypt.hash(password, 10)

  const user = await authRepository.createUser({
    name,
    email,
    password: hashed,
    role: Role.user,
  })

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

export async function loginUser(email: string, password: string) {
  const user = await authRepository.findUserByEmail(email)
  if (!user) throw new HttpError(404, 'Email tidak ditemukan')

  const match = await bcrypt.compare(password, user.password)
  if (!match) throw new HttpError(401, 'Password salah')

  const token = generateToken({
    id: user.id,
    role: user.role,
  })

  return {
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  }
}

export async function verifyTokenAndUser(token: string) {
  const payload = verifyToken(token) as { id: string; role: Role }
  const user = await authRepository.findUserById(payload.id)
  if (!user) throw new HttpError(401, 'User tidak ditemukan')
  return user
}
