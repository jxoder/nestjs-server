import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Request } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'
import { CoreException, EXCEPTION_TYPE } from '../exception'

@Catch()
export class HTTPExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('HTTP_EXCEPTION')

  catch(exception: unknown, host: ArgumentsHost) {
    if (host.getType() !== 'http') return

    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse()

    const error = this.handleException(exception)

    this.logger.error(
      `Method: ${request.method}; Path: ${request.originalUrl}, Code: ${error.code}, Error: ${error.message}, IP: ${request.clientIp}`,
    )

    const status = Object.values(HttpStatus).includes(error.code)
      ? error.code
      : HttpStatus.BAD_REQUEST

    return response.status(status).send(error)
  }

  private handleException(exception: unknown) {
    if (exception instanceof CoreException) {
      return {
        code: exception.code,
        message: exception.message,
        ctx: exception.ctx,
      }
    }

    if (exception instanceof JsonWebTokenError) {
      return {
        code: EXCEPTION_TYPE.UNAUTHORIZED,
        message: EXCEPTION_TYPE[EXCEPTION_TYPE.UNAUTHORIZED],
      }
    }

    this.logger.error(exception)

    return {
      code: EXCEPTION_TYPE.INTERNAL_SERVER_ERROR,
      message: EXCEPTION_TYPE[EXCEPTION_TYPE.INTERNAL_SERVER_ERROR],
    }
  }
}
