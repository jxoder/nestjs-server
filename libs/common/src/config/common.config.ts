import { registerAs } from '@nestjs/config'
import { get } from 'env-var'
import { ENV_CONST, ENVType, LOG_LEVEL_CONST, LogLevelType } from '../types'

export const COMMON_CONFIG_KEY = 'common'

export interface ICommonConfig {
  APP_NAME: string

  ENV: ENVType
  LOG_LEVEL: LogLevelType
}

export const commonConfig = registerAs<ICommonConfig>(
  COMMON_CONFIG_KEY,
  () => ({
    APP_NAME: get('APP_NAME').default('unknwon').asString(),
    ENV: get('ENV').default('local').asEnum(ENV_CONST),
    LOG_LEVEL: get('LOG_LEVEL').default('info').asEnum(LOG_LEVEL_CONST),
  }),
)
