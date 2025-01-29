import { Module } from '@nestjs/common'
import { ApiModule } from '@slibs/api'
import { CommonModule } from '@slibs/common'
import { DatabaseModule } from '@slibs/database'
import { MainAppController } from './main-app.controller'
import { MainAppService } from './main-app.service'

@Module({
  imports: [CommonModule, ApiModule, DatabaseModule.forRoot()],
  controllers: [MainAppController],
  providers: [MainAppService],
})
export class MainAppModule {}
