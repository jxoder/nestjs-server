import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtBearerAuthorized, ReqUser, UserService } from '@slibs/user'
import { UserSelfResponse } from '../../dto'

@ApiTags('v1/Users')
@Controller({ path: 'users', version: '1' })
export class UserControllerV1 {
  constructor(private readonly userService: UserService) {}

  @JwtBearerAuthorized()
  @Get('self')
  @ApiOperation({ summary: 'get self info' })
  @ApiResponse({ type: UserSelfResponse })
  async getSelf(@ReqUser() reqUser: { id: number }) {
    const user = await this.userService.findOneById(reqUser.id)
    return UserSelfResponse.from(user)
  }
}
