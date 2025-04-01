import { Injectable } from '@nestjs/common'
import { UserRepository } from '../repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: number) {
    return this.userRepository.findOneByOrFail({ id })
  }
}
