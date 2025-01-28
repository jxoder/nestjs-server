import { NestFactory } from '@nestjs/core'
import { MainAppModule } from './main-app.module'

async function bootstrap() {
  const app = await NestFactory.create(MainAppModule)
  await app.listen(process.env.port ?? 3000)
}

bootstrap()
