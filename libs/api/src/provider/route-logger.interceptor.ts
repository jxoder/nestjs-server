import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common'
import { Observable, tap } from 'rxjs'

@Injectable()
export class RouteLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger('API')

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const type = context.getType()

    if (!type.startsWith('http')) return next.handle()

    const request = context.switchToHttp().getRequest()
    const st = new Date().getTime()

    return next.handle().pipe(
      tap(_ => {
        this.logger.log(
          `Method: ${request.method}, Path: ${request.originalUrl}, Time: ${new Date().getTime() - st}ms, IP: ${request.clientIp}`,
        )
      }),
    )
  }
}
