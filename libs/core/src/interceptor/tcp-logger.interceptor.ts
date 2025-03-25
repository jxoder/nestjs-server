import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common'
import { Observable, tap } from 'rxjs'

@Injectable()
export class TCPLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger('TCP')

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    if (context.getType() !== 'rpc') return next.handle()

    const st = new Date().getTime()
    const ctx = context.getArgByIndex(1)

    return next.handle().pipe(
      tap(_ => {
        this.logger.log(
          `Cmd: ${ctx.args?.[1] ?? 'UNKNWON'}; Time: ${new Date().getTime() - st}ms`,
        )
      }),
    )
  }
}
