import { Module } from '@nestjs/common'
import { DatabaseModule } from '@slibs/database'
import { EmailAccountEntity, UserEntity } from './entities'
import { EmailAccountRepository, UserRepository } from './repository'
import { EmailAccountService } from './service'

@Module({
  imports: [DatabaseModule.forFeature([UserEntity, EmailAccountEntity])],
  providers: [UserRepository, EmailAccountRepository, EmailAccountService],
})
export class UserModule {}
