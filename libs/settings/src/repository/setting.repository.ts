import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CommonRepository } from '@slibs/database'
import { Repository } from 'typeorm'
import { SettingEntity } from '../entities'

@Injectable()
export class SettingRepository extends CommonRepository<SettingEntity, number> {
  constructor(
    @InjectRepository(SettingEntity) repository: Repository<SettingEntity>,
  ) {
    super(repository, 'id')
  }
}
