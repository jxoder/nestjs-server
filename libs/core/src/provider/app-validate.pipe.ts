import { Provider, ValidationPipe } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { CoreException, EXCEPTION_TYPE } from '../exception'

export const APP_VALIDATE_PIPE: Provider = {
  provide: APP_PIPE,
  useValue: new ValidationPipe({
    transform: true,
    whitelist: true,
    stopAtFirstError: true,
    exceptionFactory: errors => {
      return new CoreException(
        EXCEPTION_TYPE.BAD_REQUEST,
        errors[0].constraints?.[Object.keys(errors[0].constraints)[0]],
      )
    },
  }),
}
