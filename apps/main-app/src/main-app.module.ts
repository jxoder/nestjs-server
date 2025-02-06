import { Module } from '@nestjs/common'
import { ApiModule } from '@slibs/api'
import { CommonModule } from '@slibs/common'
import { DatabaseModule } from '@slibs/database'
import { UserModule } from '@slibs/user'
import { MainAppController } from './main-app.controller'
import { MainAppService } from './main-app.service'

@Module({
  imports: [CommonModule, ApiModule, DatabaseModule.forRoot(), UserModule],
  controllers: [MainAppController],
  providers: [MainAppService],
})
export class MainAppModule {}
