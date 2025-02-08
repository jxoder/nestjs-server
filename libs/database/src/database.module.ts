import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import {
  addTransactionalDataSource,
  getDataSourceByName,
  initializeTransactionalContext,
} from 'typeorm-transactional'
import { DATABASE_CONFIG_KEY, databaseConfig, IDatabaseConfig } from './config'
import { TypeORMEntityClassOrSchema } from './types'

@Module({})
export class DatabaseModule {
  // database mocking 에 활용할 수 있음.
  static dataSourceOptions: DataSourceOptions | null = null

  static forRoot(): DynamicModule {
    initializeTransactionalContext()

    return {
      global: true,
      module: this,
      imports: [
        ConfigModule.forFeature(databaseConfig),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            const config =
              configService.getOrThrow<IDatabaseConfig>(DATABASE_CONFIG_KEY)

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
            return {
              type: 'postgres',
              url: config.CONNECTION_STRING,
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
