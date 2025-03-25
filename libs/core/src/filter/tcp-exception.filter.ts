import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common'
import { CoreException, EXCEPTION_TYPE } from '../exception'

@Catch()
export class TCPExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('TCP_EXCEPION')

  catch(exception: unknown, host: ArgumentsHost) {
    if (host.getType() !== 'rpc') return

    const rpc = host.switchToRpc()
    const ctx = rpc.getContext()

    const error = this.handleException(exception)
    this.logger.error(
      `Cmd: ${ctx.args?.[1] ?? 'UNKNWON'}; Code: ${error.code}; Error: ${error.message};`,
    )

    throw error
  }

  private handleException(exception: unknown) {
    if (exception instanceof CoreException) {
      return {
        code: exception.code,
        message: exception.message,
        ctx: exception.ctx,
      }
    }

    this.logger.error(exception)
    return {
      code: EXCEPTION_TYPE.INTERNAL_SERVER_ERROR,
      message: EXCEPTION_TYPE[EXCEPTION_TYPE.INTERNAL_SERVER_ERROR],
    }
  }
}
