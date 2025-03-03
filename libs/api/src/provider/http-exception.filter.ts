import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Request } from 'express'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('HTTP_EXCEPION')

  catch(exception: unknown, host: ArgumentsHost) {
    const type = host.getType()

    if (!type.startsWith('http')) {
      return
    }

    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse()

    const { code, message } = this.handleException(exception)

    this.logger.error(
      `Method: ${request.method}, Path: ${request.originalUrl}, Code: ${code}, Error: ${message}, IP: ${request.clientIp}`,
    )

    process.env.ENV === 'local' && this.logger.error(exception)

    return response.status(code).send({ code, message })
  }

  private handleException(exception: unknown): {
    code: number
    message: string
  } {
    if (exception instanceof HttpException) {
      return {
        code: exception.getStatus(),
        message: exception.message,
      }
    }

    return {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'INTERNAL_SERVER_ERROR',
    }
  }
}
