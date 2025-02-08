import { ApiProperty } from '@nestjs/swagger'
import { CommonResponseDto, OkResponseDto } from '@slibs/api'
import { UserEntity } from '@slibs/user'

export class LoginResponse extends CommonResponseDto {
  @ApiProperty({ description: 'access token' })
  accessToken!: string

  @ApiProperty({ description: 'refresh token' })
  refreshToken!: string

  @ApiProperty({ type: UserEntity, description: 'user info' })
  user!: UserEntity

  static from(
    user: UserEntity,
    accessToken: string,
    refreshToken: string,
  ): LoginResponse {
    return {
      ...OkResponseDto.from(),
      user,
      accessToken,
      refreshToken,
    }
  }
}

export class CreateAccessTokenResponse extends CommonResponseDto {
  @ApiProperty({ description: 'access token' })
  accessToken!: string

  static from(accessToken: string): CreateAccessTokenResponse {
    return {
      ...OkResponseDto.from(),
      accessToken,
    }
  }
}
