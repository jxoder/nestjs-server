import { Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  IReqUser,
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
  async getAccessToken(@ReqUser() reqUser: IReqUser) {
    const accessToken = await this.userAuthService.createAccessToken(reqUser)
    return CreateAccessTokenResponse.from(accessToken)
  }
}
