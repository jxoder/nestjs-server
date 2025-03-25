import { Module } from '@nestjs/common'
import {
  APP_TCP_EXCEPTION_FILTER,
  APP_TCP_LOGGER_INTERCEPTOR,
  APP_VALIDATE_PIPE,
  CoreModule,
} from '@slibs/core'
import { AuthController } from './auth.controller'
import configure from './config/configure'

@Module({
  imports: [CoreModule.forRoot('auth', configure)],
  providers: [
    APP_VALIDATE_PIPE,
    APP_TCP_EXCEPTION_FILTER,
    APP_TCP_LOGGER_INTERCEPTOR,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
