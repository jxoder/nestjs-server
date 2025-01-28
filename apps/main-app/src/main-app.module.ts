import { Module } from '@nestjs/common'
import { ApiModule } from '@slibs/api'
import { CommonModule } from '@slibs/common'
import { MainAppController } from './main-app.controller'
import { MainAppService } from './main-app.service'

@Module({
  imports: [CommonModule, ApiModule],
  controllers: [MainAppController],
  providers: [MainAppService],
})
export class MainAppModule {}
