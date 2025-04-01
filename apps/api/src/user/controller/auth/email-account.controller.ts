import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { OkResponse } from '@slibs/core'
import {
  LoginEmailAccountPayload,
  SendVerifyCodeRequestPayload,
  SignEmailAccountPayload,
} from '../../dto'
import { LoginResponse } from '../../dto/api.response'
import { BearerAuthService, EmailAccountService } from '../../service'

@ApiTags('Auth/EmailAccount')
@Controller({ path: 'auth/email-account' })
export class AuthEmailAccountController {
  constructor(
    private readonly emailAccountService: EmailAccountService,
    private readonly bearerAuthService: BearerAuthService,
  ) {}

  @Post('send/verify-code')
  @ApiOperation({ summary: 'send verify code' })
  @ApiResponse({ type: OkResponse })
  async sendVerifyCode(@Body() body: SendVerifyCodeRequestPayload) {
    await this.emailAccountService.sendVerifyCode(body)
    return OkResponse.from()
  }

  @Post('sign')
  @ApiOperation({ summary: 'sign email account' })
  @ApiResponse({ type: OkResponse })
  async sign(@Body() body: SignEmailAccountPayload) {
    await this.emailAccountService.sign(body)
    return OkResponse.from()
  }

  @Post('login')
  @ApiOperation({ summary: 'login email account' })
  @ApiResponse({ type: LoginResponse })
  async login(@Body() body: LoginEmailAccountPayload) {
    const user = await this.emailAccountService.login(body)
    const refreshToken = await this.bearerAuthService.createRefreshToken(
      user.id,
    )
    const accessToken = await this.bearerAuthService.signAccessToken(user)
    return LoginResponse.from(user, accessToken, refreshToken)
  }
}
