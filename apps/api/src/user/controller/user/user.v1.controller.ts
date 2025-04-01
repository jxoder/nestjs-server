import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IReqUser, JwtBearerAuthorized, ReqUser } from '../../decorator'
import { GetUserSelfResponse } from '../../dto/api.response'
import { UserService } from '../../service'

@ApiTags('v1/Users')
@Controller({ path: 'users', version: '1' })
export class UserControllerV1 {
  constructor(private readonly userService: UserService) {}

  @JwtBearerAuthorized()
  @Get('self')
  @ApiOperation({ summary: 'get self info' })
  @ApiResponse({ type: GetUserSelfResponse })
  async getSelf(@ReqUser() reqUser: IReqUser) {
    const user = await this.userService.findById(reqUser.id)
    return GetUserSelfResponse.from(user)
  }
}
