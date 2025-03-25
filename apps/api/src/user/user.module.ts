import { Module } from '@nestjs/common'
import { DatabaseModule } from '@slibs/database'
import { UserEntity } from './entities'

@Module({
  imports: [DatabaseModule.forFeature([UserEntity])],
})
export class UserModule {}
