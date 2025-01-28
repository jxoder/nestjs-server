import { NestFactory } from '@nestjs/core'
import { mw } from 'request-ip'
import { MainAppModule } from './main-app.module'

async function bootstrap() {
  const app = await NestFactory.create(MainAppModule)

  app.use(mw())
  app.useLogger(['log'])

  await app.listen(process.env.port ?? 3000)
}

bootstrap()
