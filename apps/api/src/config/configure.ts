import { registerAs } from '@nestjs/config'
import { get } from 'env-var'

export default registerAs('config', () => ({
  // Basic
  APP_NAME: 'api',
  ENV: get('ENV').default('local').asEnum(['test', 'local', 'dev', 'prod']),
  LOG_LEVEL: get('LOG_LEVEL')
    .default('debug')
    .asEnum(['error', 'warn', 'info', 'debug', 'verbose']),
  HOST: get('HOST').default('0.0.0.0').asString(),
  PORT: get('PORT').default(4000).asPortNumber(),

  // Cors
  ORIGINS: get('ORIGINS').default('').asArray(),

  // Swagger
  ENABLED_SWAGGER: get('ENABLED_SWAGGER').default('false').asBool(),
  SWAGGER_TITLE: get('SWAGGER_TITLE').default('API').asString(),
  SWAGGER_DESCRIPTION: get('SWAGGER_DESCRIPTION').default('API').asString(),

  // Database
  DATABASE_URL: get('DATABASE_URL').required().asString(),

  // Redis
  REDIS_HOST: get('REDIS_HOST').required().asString(),
  REDIS_PORT: get('REDIS_PORT').required().asPortNumber(),
  REDIS_PASSWORD: get('REDIS_PASSWORD').asString(),
}))
