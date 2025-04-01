import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CommonRepository } from '@slibs/database'
import { Repository } from 'typeorm'
import { BearerRefreshTokenEntity } from '../entities'

@Injectable()
export class BearerRefreshTokenRepository extends CommonRepository<
  BearerRefreshTokenEntity,
  string
> {
  constructor(
    @InjectRepository(BearerRefreshTokenEntity)
    repository: Repository<BearerRefreshTokenEntity>,
  ) {
    super(repository, 'token')
  }
}
