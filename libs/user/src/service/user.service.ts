import { Injectable } from '@nestjs/common'
import { UserRepository } from '../repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOneById(id: number) {
    return this.userRepository.findOneByOrFail({ id })
  }
}
