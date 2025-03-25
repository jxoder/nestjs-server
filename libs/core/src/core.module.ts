import { DynamicModule, Module } from '@nestjs/common'
import { ConfigFactory, ConfigModule } from '@nestjs/config'

@Module({})
export class CoreModule {
  static forRoot(
    appName: string,
    configuration: ConfigFactory<Record<string, any>>,
  ): DynamicModule {
    return {
      global: true,
      module: this,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: [`.env.${appName}`, `.env.${process.env.ENV}`, '.env'],
          load: [configuration],
        }),
      ],
    }
  }
}
