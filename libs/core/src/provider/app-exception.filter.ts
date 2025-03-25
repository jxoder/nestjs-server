import { Provider } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { HTTPExceptionFilter, TCPExceptionFilter } from '../filter'

export const APP_TCP_EXCEPTION_FILTER: Provider = {
  provide: APP_FILTER,
  useClass: TCPExceptionFilter,
}

export const APP_HTTP_EXCEPTION_FILTER: Provider = {
  provide: APP_FILTER,
  useClass: HTTPExceptionFilter,
}
