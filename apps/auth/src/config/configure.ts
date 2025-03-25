import { registerAs } from '@nestjs/config'
import { get } from 'env-var'

export default registerAs('config', () => ({
  // Basic
  APP_NAME: 'auth',
  ENV: get('ENV').default('local').asEnum(['test', 'local', 'dev', 'prod']),
  LOG_LEVEL: get('LOG_LEVEL')
    .default('debug')
    .asEnum(['error', 'warn', 'info', 'debug', 'verbose']),
  HOST: get('HOST').default('0.0.0.0').asString(),
  PORT: get('PORT').default(4001).asPortNumber(),

  // Database
  DATABASE_URL: get('DATABASE_URL').required().asString(),
}))
