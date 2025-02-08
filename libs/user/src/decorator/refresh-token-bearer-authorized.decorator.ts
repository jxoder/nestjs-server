import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { RefreshTokenGuard } from '../guard'

export const RefreshTokenBeaererAuthorized = (): MethodDecorator => {
  return applyDecorators(ApiBearerAuth(), UseGuards(RefreshTokenGuard))
}
