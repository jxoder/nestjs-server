import { Module } from '@nestjs/common'
import { ApiModule } from '@slibs/api'
import { CommonModule } from '@slibs/common'
import { DatabaseModule } from '@slibs/database'
import { SettingsModule } from '@slibs/settings'
import { UserModule } from '@slibs/user'
import { AuthController, EmailAccountController } from './auth'
import { SettingsController } from './settings'
import { UserControllerV1 } from './user'

@Module({
  imports: [
    CommonModule,
    ApiModule,
    DatabaseModule.forRoot(),
    UserModule,
    SettingsModule.forRoot(),
  ],
  controllers: [
    AuthController,
    EmailAccountController,
    UserControllerV1,
    SettingsController,
  ],
})
export class MainAppModule {}
