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
import { RefreshTokenStrategy, UserJwtStrategy } from './strategy'

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

    // strategy
    UserJwtStrategy,
    RefreshTokenStrategy,
  ],
  exports: [UserService, EmailAccountService, UserAuthService],
})
export class UserModule {}
