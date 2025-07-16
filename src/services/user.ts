import * as userRepository from '../repositories/user'

export function getUsers() {
  return userRepository.findAllUsers()
}

export function registerUser(name: string, email: string) {
  return userRepository.createUser({ name, email })
}
