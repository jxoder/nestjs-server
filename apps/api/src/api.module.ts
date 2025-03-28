import { Module } from '@nestjs/common'

import {
  APP_HTTP_EXCEPTION_FILTER,
  APP_HTTP_LOGGER_INTERCEPTOR,
  APP_VALIDATE_PIPE,
  CoreModule,
} from '@slibs/core'
import { DatabaseModule } from '@slibs/database'
import { RedisModule } from '@slibs/redis'
import configure from './config/configure'
import { HealthModule } from './health/health.module'

@Module({
  imports: [
    CoreModule.forRoot('api', configure),
    DatabaseModule.forRoot(configure.KEY),
    RedisModule.forRoot(configure.KEY),

    // In Modules
    HealthModule,
  ],
  providers: [
    APP_VALIDATE_PIPE,
    APP_HTTP_EXCEPTION_FILTER,
    APP_HTTP_LOGGER_INTERCEPTOR,
  ],
})
export class ApiAppModule {}
