import { LogLevel, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import compression from 'compression'
import { Request, Response } from 'express'
import { mw } from 'request-ip'
import { ApiAppModule } from './api.module'
import { configKey, ConfigType } from './config'

async function bootstrap() {
  const app = await NestFactory.create(ApiAppModule)

  const config = app.get<ConfigType>(configKey)

  app.use(mw())
  app.use(
    compression({
      filter: (req: Request, res: Response) => {
        if (req.get('x-no-compression') === '1') {
          return false
        }
        return compression.filter(req, res)
      },
    }),
  )
  app.use('/favicon.ico', (_: Request, res: Response) => {
    res.status(204).end()
  })

  app.useLogger([config.LOG_LEVEL as LogLevel])
  app.enableVersioning({ type: VersioningType.URI })

  app.enableCors({
    origin: config.ORIGINS.length > 0 ? config.ORIGINS : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })

  if (config.ENABLED_SWAGGER) {
    const builder = new DocumentBuilder()
      .setTitle(config.SWAGGER_TITLE)
      .setDescription(config.SWAGGER_DESCRIPTION)
      .setVersion(process.env.npm_package_version || '0.0.1')
      .addBearerAuth({ type: 'http', in: 'header', bearerFormat: 'JWT' })
      .build()

    const document = SwaggerModule.createDocument(app, builder)
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
    })
  }

  await app.listen(config.PORT, config.HOST)
}
bootstrap()
