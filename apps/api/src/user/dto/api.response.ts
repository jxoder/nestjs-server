import { ApiProperty } from '@nestjs/swagger'
import { CommonApiResponse, OkResponse } from '@slibs/core'
import { UserEntity } from '../entities'
import { UserSelfDto } from './user.dto'

export class LoginResponse extends CommonApiResponse {
  @ApiProperty({ description: 'access token' })
  accessToken!: string

  @ApiProperty({ description: 'refresh token' })
  refreshToken!: string

  @ApiProperty({ type: UserSelfDto, description: 'user info' })
  user!: UserSelfDto

  static from(user: UserEntity, accessToken: string, refreshToken: string) {
    return {
      ...OkResponse.from(),
      accessToken,
      refreshToken,
      user: UserSelfDto.from(user),
    }
  }
}

export class CreateAccessTokenResponse extends CommonApiResponse {
  @ApiProperty({ description: 'access token' })
  accessToken!: string

  static from(accessToken: string) {
    return {
      ...OkResponse.from(),
      accessToken,
    }
  }
}

export class GetUserSelfResponse extends CommonApiResponse {
  @ApiProperty({ type: UserSelfDto, description: 'user info' })
  user!: UserSelfDto

  static from(user: UserEntity) {
    return {
      ...OkResponse.from(),
      user: UserSelfDto.from(user),
    }
  }
}
