import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '@slibs/database'
import { userConfig } from './config'
import {
  BearerRefreshTokenEntity,
  EmailAccountEntity,
  UserEntity,
} from './entities'
import {
  BearerRefreshTokenRepository,
  EmailAccountRepository,
  UserRepository,
} from './repository'
import { EmailAccountService, UserAuthService, UserService } from './service'

@Module({
  imports: [
    ConfigModule.forFeature(userConfig),
    DatabaseModule.forFeature([
      UserEntity,
      EmailAccountEntity,
      BearerRefreshTokenEntity,
    ]),
  ],
  providers: [
    UserRepository,
    EmailAccountRepository,
    BearerRefreshTokenRepository,
    EmailAccountService,
    UserService,
    UserAuthService,
  ],
  exports: [UserService, EmailAccountService, UserAuthService],
})
export class UserModule {}
