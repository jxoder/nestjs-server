import { Module } from '@nestjs/common'
import { ApiModule } from '@slibs/api'
import { CommonModule } from '@slibs/common'
import { DatabaseModule } from '@slibs/database'
import { UserModule } from '@slibs/user'
import { EmailAccountController } from './auth'

@Module({
  imports: [CommonModule, ApiModule, DatabaseModule.forRoot(), UserModule],
  controllers: [EmailAccountController],
})
export class MainAppModule {}
