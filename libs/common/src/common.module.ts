import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { commonConfig } from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.ENV}`, '.env'],
      load: [commonConfig],
    }),
  ],
})
export class CommonModule {}
