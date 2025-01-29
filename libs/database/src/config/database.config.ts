import { registerAs } from '@nestjs/config'
import { get } from 'env-var'

export interface IDatabaseConfig {
  TYPE: 'postgres' | 'pglite'
  CONNECTION_STRING: string
  SCHEMA?: string
}

export const DATABASE_CONFIG_KEY = 'database'

export const databaseConfig = registerAs(DATABASE_CONFIG_KEY, () => ({
  TYPE: get('DATABASE_TYPE').default('postgres').asEnum(['postgres', 'pglite']),
  CONNECTION_STRING: get('DATABASE_CONNECTION_STRING')
    .default('postgres://postgres:postgres@localhost:5432')
    .asString(),
  SCHEMA: get('DATABASE_SCHEMA').asString(),
}))
