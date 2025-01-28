import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ISwaggerConfig } from '../config'

export function setupSwagger(app: INestApplication, config: ISwaggerConfig) {
  if (!config.ENABLED_SWAGGER) return

  const builder = new DocumentBuilder()
    .setTitle(config.SWAGGER_TITLE)
    .setDescription(config.SWAGGER_DESCRIPTION)
    .setVersion(process.env.npm_package_version || '0.0.1')
    .addBearerAuth({ type: 'http', in: 'header', bearerFormat: 'JWT' })
    .build()

  const document = SwaggerModule.createDocument(app, builder)
  SwaggerModule.setup(config.SWAGGER_PATH, app, document)
}
