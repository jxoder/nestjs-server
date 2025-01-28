export const ENV_CONST = ['test', 'local', 'dev', 'prod'] as const
export type ENVType = (typeof ENV_CONST)[number]

export const LOG_LEVEL_CONST = [
  'debug',
  'info',
  'warn',
  'error',
  'fatal',
] as const
export type LogLevelType = (typeof LOG_LEVEL_CONST)[number]
