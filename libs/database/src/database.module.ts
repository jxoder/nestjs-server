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
            return {
              type: 'postgres',
              url: config.CONNECTION_STRING,
              schema: config.SCHEMA,
              namingStrategy: new SnakeNamingStrategy(),
              autoLoadEntities: true,
              retryAttempts: 3,
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
