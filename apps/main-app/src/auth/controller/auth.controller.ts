import { Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  RefreshTokenBeaererAuthorized,
  ReqUser,
  UserAuthService,
} from '@slibs/user'
import { CreateAccessTokenResponse } from '../dto'

@ApiTags('Auth')
@Controller({ path: 'auth' })
export class AuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @RefreshTokenBeaererAuthorized()
  @Post('refresh-token')
  @ApiOperation({ summary: 'get access token with refresh token' })
  @ApiResponse({ type: CreateAccessTokenResponse })
  async getAccessToken(@ReqUser() reqUser: { id: number }) {
    const accessToken = await this.userAuthService.createAccessToken(reqUser.id)
    return CreateAccessTokenResponse.from(accessToken)
  }
}
