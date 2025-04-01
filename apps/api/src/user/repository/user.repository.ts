import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CommonRepository } from '@slibs/database'
import { Repository } from 'typeorm'
import { UserEntity } from '../entities'

@Injectable()
export class UserRepository extends CommonRepository<UserEntity, number> {
  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
  ) {
    super(repository, 'id')
  }
}
