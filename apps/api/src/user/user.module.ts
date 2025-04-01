import { Module } from '@nestjs/common'
import { DatabaseModule } from '@slibs/database'
import {
  AuthController,
  AuthEmailAccountController,
  UserControllerV1,
} from './controller'
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
import { BearerAuthService, EmailAccountService, UserService } from './service'
import { UserJwtStrategy, UserRefreshStrategy } from './strategy'

@Module({
  imports: [
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

    UserService,
    EmailAccountService,
    BearerAuthService,

    UserJwtStrategy,
    UserRefreshStrategy,
  ],
  controllers: [AuthEmailAccountController, AuthController, UserControllerV1],
})
export class UserModule {}
