export const ENV_CONST = ['test', 'local', 'dev', 'prod'] as const
export type ENVType = (typeof ENV_CONST)[number]

export const LOG_LEVEL_CONST = [
  'log',
  'error',
  'warn',
  'debug',
  'verbose',
  'fatal',
] as const
export type LogLevelType = (typeof LOG_LEVEL_CONST)[number]
