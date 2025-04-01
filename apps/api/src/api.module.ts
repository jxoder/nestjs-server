import { Module } from '@nestjs/common'

import {
  APP_HTTP_EXCEPTION_FILTER,
  APP_HTTP_LOGGER_INTERCEPTOR,
  APP_VALIDATE_PIPE,
  CoreModule,
} from '@slibs/core'
import { DatabaseModule } from '@slibs/database'
import { RedisModule } from '@slibs/redis'
import { configKey, configure } from './config'
import { HealthModule } from './health'
import { UserModule } from './user'

@Module({
  imports: [
    CoreModule.forRoot('api', configure),
    DatabaseModule.forRoot(configKey),
    RedisModule.forRoot(configKey),

    // In Modules
    HealthModule,
    UserModule,
  ],
  providers: [
    APP_VALIDATE_PIPE,
    APP_HTTP_EXCEPTION_FILTER,
    APP_HTTP_LOGGER_INTERCEPTOR,
  ],
})
export class ApiAppModule {}
