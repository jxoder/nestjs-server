import { registerAs } from '@nestjs/config'
import { get } from 'env-var'

export const USER_CONFIG_KEY = 'user'

export interface IUserConfig {
  JWT_SECRET: string
  JWT_EXPIRES_IN_SECONDS: number
  REFRESH_EXPIRES_IN_SECONDS: number
}

const JWT_EXPIRES_IN_SECONDS = 60 * 60 * 24 // 1 days
const REFRESH_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 30 // 30 days

export const userConfig = registerAs<IUserConfig>(USER_CONFIG_KEY, () => ({
  JWT_SECRET: get('USER_JWT_SECRET').default('secret').asString(),
  JWT_EXPIRES_IN_SECONDS: get('USER_JWT_EXPIRES_IN_SECONDS')
    .default(JWT_EXPIRES_IN_SECONDS)
    .asIntPositive(),
  REFRESH_EXPIRES_IN_SECONDS: get('USER_REFRESH_EXPIRES_IN_SECONDS')
    .default(REFRESH_EXPIRES_IN_SECONDS)
    .asIntPositive(),
}))
