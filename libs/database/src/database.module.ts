import { DynamicModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import {
  addTransactionalDataSource,
  getDataSourceByName,
  initializeTransactionalContext,
} from 'typeorm-transactional'
import { TypeORMEntityClassOrSchema } from './types'

@Module({})
export class DatabaseModule {
  // database mocking 에 활용할 수 있음.
  static dataSourceOptions: DataSourceOptions | null = null

  static forRoot(configKey: string): DynamicModule {
    initializeTransactionalContext()

    return {
      global: true,
      module: this,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [configKey],
          useFactory: (config: Record<string, any>) => {
            if (this.dataSourceOptions) {
              return {
                schema: config.SCHEMA,
                ...this.dataSourceOptions,
                namingStrategy: new SnakeNamingStrategy(),
                autoLoadEntities: true,
                synchronize: true,
                retryAttempts: 3,
              }
            }

            if (!config.DATABASE_URL) {
              throw new Error('DATABASE_URL is required')
            }

            return {
              type: 'postgres',
              url: config.DATABASE_URL,
              schema: config.SCHEMA,
              namingStrategy: new SnakeNamingStrategy(),
              autoLoadEntities: true,
              retryAttempts: 3,
              // logging: true,
            }
          },
          dataSourceFactory: async (options?: DataSourceOptions) => {
            if (!options) {
              throw new Error('DataSoureOptions is required')
            }

            return (
              getDataSourceByName('default') ||
              addTransactionalDataSource(new DataSource(options))
            )
          },
        }),
      ],
      exports: [TypeOrmModule],
    }
  }

  static forFeature(
    entities: Array<TypeORMEntityClassOrSchema>,
  ): DynamicModule {
    return TypeOrmModule.forFeature(entities)
  }
}
