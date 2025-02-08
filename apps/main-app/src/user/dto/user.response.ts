import { ApiProperty } from '@nestjs/swagger'
import { CommonResponseDto, OkResponseDto } from '@slibs/api'
import { UserEntity } from '@slibs/user'

export class UserSelfResponse extends CommonResponseDto {
  @ApiProperty({ type: UserEntity, description: 'user info' })
  user!: UserEntity

  static from(user: UserEntity): UserSelfResponse {
    return {
      ...OkResponseDto.from(),
      user,
    }
  }
}
