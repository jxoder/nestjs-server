import { Provider } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { TCPLoggerInterceptor } from '../interceptor'

export const APP_TCP_LOGGER_INTERCEPTOR: Provider = {
  provide: APP_INTERCEPTOR,
  useClass: TCPLoggerInterceptor,
}
