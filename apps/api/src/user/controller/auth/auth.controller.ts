import { Controller, Post, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { IReqUser, ReqUser } from '../../decorator'
import { CreateAccessTokenResponse } from '../../dto/api.response'
import { UserRefreshGuard } from '../../guard'
import { BearerAuthService, UserService } from '../../service'

@ApiTags('Auth')
@Controller({ path: 'auth' })
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly bearerAuthService: BearerAuthService,
  ) {}

  @ApiBearerAuth()
  @Post('access-token')
  @UseGuards(UserRefreshGuard)
  @ApiOperation({ summary: 'create new access token by refresh token' })
  @ApiResponse({ type: CreateAccessTokenResponse })
  async createAccessToken(@ReqUser() reqUser: IReqUser) {
    const user = await this.userService.findById(reqUser.id)
    const accessToken = await this.bearerAuthService.signAccessToken(user)
    return CreateAccessTokenResponse.from(accessToken)
  }
}
