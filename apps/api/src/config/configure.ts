import { ConfigType as NestConfigType, registerAs } from '@nestjs/config'
import { get } from 'env-var'

export const configure = registerAs('config', () => ({
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

  // User
  USER_JWT_SECRET: get('USER_JWT_SECRET').default('secret').asString(),
  USER_JWT_EXPIRES_IN: get('USER_JWT_EXPIRES_IN')
    .default(60 * 60) // 1 hour
    .asIntPositive(),
  USER_REFRESH_TOKEN_EXPIRES_IN: get('USER_REFRESH_TOKEN_EXPIRES_IN')
    .default(60 * 60 * 24 * 14) // 14 days
    .asIntPositive(),
}))

export const configKey = configure.KEY
export type ConfigType = NestConfigType<typeof configure>
