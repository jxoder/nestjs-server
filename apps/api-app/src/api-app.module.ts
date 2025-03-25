import { Module } from '@nestjs/common'
import {
  APP_HTTP_EXCEPTION_FILTER,
  APP_HTTP_LOGGER_INTERCEPTOR,
  APP_VALIDATE_PIPE,
  CoreModule,
} from '@slibs/core'
import { DatabaseModule } from '@slibs/database'
import configure from './config/configure'
import { HealthController } from './health.controller'

@Module({
  imports: [
    CoreModule.forRoot('api', configure),
    DatabaseModule.forRoot(configure.KEY),
  ],
  providers: [
    APP_VALIDATE_PIPE,
    APP_HTTP_EXCEPTION_FILTER,
    APP_HTTP_LOGGER_INTERCEPTOR,
  ],
  controllers: [HealthController],
})
export class ApiAppModule {}
