import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { USER_ROLE } from '../constants'

export interface IReqUser {
  id: number
  role: USER_ROLE
}

export const ReqUser: () => ParameterDecorator = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): IReqUser => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  },
)
