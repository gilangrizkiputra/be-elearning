import * as userRepository from '../repositories/user'

export function getUsers() {
  return userRepository.findAllUsers()
}
