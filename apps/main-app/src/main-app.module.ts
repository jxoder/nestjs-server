import { Module } from '@nestjs/common'
import { ApiModule } from '@slibs/api'
import { CommonModule } from '@slibs/common'
import { DatabaseModule } from '@slibs/database'
import { UserModule } from '@slibs/user'
import { AuthController, EmailAccountController } from './auth'
import { UserControllerV1 } from './user'

@Module({
  imports: [CommonModule, ApiModule, DatabaseModule.forRoot(), UserModule],
  controllers: [AuthController, EmailAccountController, UserControllerV1],
})
export class MainAppModule {}
