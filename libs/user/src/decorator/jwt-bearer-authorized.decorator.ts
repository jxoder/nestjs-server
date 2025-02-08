import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { UserJwtGuard } from '../guard'

export const JwtBearerAuthorized = (): MethodDecorator => {
  return applyDecorators(ApiBearerAuth(), UseGuards(UserJwtGuard))
}
