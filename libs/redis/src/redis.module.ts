import { DynamicModule, Module } from '@nestjs/common'
import { Redis } from 'ioredis'
import { catchError, defer, lastValueFrom, retry, timer } from 'rxjs'

@Module({})
export class RedisModule {
  static forRoot(configKey: string): DynamicModule {
    return {
      global: true,
      module: this,
      providers: [
        {
          provide: Redis,
          inject: [configKey],
          useFactory: async (config: Record<string, any>) => {
            if (!config.REDIS_HOST || !config.REDIS_PORT) {
              throw new Error(`REDIS_HOST and REDIS_PORT are required`)
            }

            const redis = new Redis({
              lazyConnect: true,
              host: config.REDIS_HOST,
              port: config.REDIS_PORT,
              password: config.REDIS_PASSWORD,
            })

            await lastValueFrom(
              defer(() => redis.connect()).pipe(
                retry({
                  count: 3,
                  delay: (error, retryCount) => {
                    console.error(`Failed redis connect attempt ${retryCount}`)
                    return timer(3000)
                  },
                }),
                catchError(error => {
                  console.error(`Failed to connect to redis: ${error?.message}`)
                  throw error
                }),
              ),
            )

            return redis
          },
        },
      ],
      exports: [Redis],
    }
  }
}
