import { registerAs } from '@nestjs/config'
import { get } from 'env-var'

export const API_CONFIG_KEY = 'api'

export interface ISwaggerConfig {
  ENABLED_SWAGGER: boolean
  SWAGGER_TITLE: string
  SWAGGER_DESCRIPTION: string
  SWAGGER_PATH: string
}

export interface IApiConfig extends ISwaggerConfig {
  PORT: number
  ORIGINS: Array<string>
}

export const apiConfig = registerAs<IApiConfig>(API_CONFIG_KEY, () => ({
  PORT: get('PORT').default(4000).asPortNumber(),
  ORIGINS: get('ORIGINS').default('').asArray(),

  ENABLED_SWAGGER: get('ENABLED_SWAGGER').default('false').asBool(),
  SWAGGER_TITLE: get('SWAGGER_TITLE').default('API').asString(),
  SWAGGER_DESCRIPTION: get('SWAGGER_DESCRIPTION').default('API').asString(),
  SWAGGER_PATH: get('SWAGGER_PATH').default('docs').asString(),
}))
