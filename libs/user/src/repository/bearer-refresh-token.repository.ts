import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DayUtils } from '@slibs/common'
import { CommonRepository } from '@slibs/database'
import { MoreThan, Repository } from 'typeorm'
import { BearerRefreshTokenEntity } from '../entities/bearer-refresh-token.entity'

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

  override async update(
    pk: string,
    updates: Parameters<Repository<BearerRefreshTokenEntity>['update']>[1],
  ) {
    return super.update(pk, { ...updates, updatedAt: DayUtils.getNowDate() })
  }

  async findActiveTokenByUserId(userId: number) {
    return this.repository.findOne({
      where: { userId, expiredAt: MoreThan(new Date()) },
      order: { expiredAt: 'DESC' },
    })
  }
}
