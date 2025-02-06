import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CommonRepository } from '@slibs/database'
import { Repository } from 'typeorm'
import { EmailAccountEntity } from '../entities'

@Injectable()
export class EmailAccountRepository extends CommonRepository<
  EmailAccountEntity,
  number
> {
  constructor(
    @InjectRepository(EmailAccountEntity)
    repository: Repository<EmailAccountEntity>,
  ) {
    super(repository, 'id')
  }
}
