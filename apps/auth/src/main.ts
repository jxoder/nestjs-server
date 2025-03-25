import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AuthModule } from './auth.module'
import configure from './config/configure'

async function bootstrap() {
  const app = await NestFactory.create(AuthModule)

  const config = app.get(configure.KEY)
  app.useLogger([config.LOG_LEVEL])
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.TCP,
      options: {
        host: config.HOST,
        port: config.PORT,
      },
    },
    { inheritAppConfig: true }, // 해당 옵션을 사용해야. APP_XXX 등 전역 프로바이더를 사용할 수 있음.
  )

  await app.init()
  await app.startAllMicroservices()
}

bootstrap()
