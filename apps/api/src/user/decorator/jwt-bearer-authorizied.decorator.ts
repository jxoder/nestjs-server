import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { USER_ROLE } from '../constants'
import { USER_ROLE_METADATA_KEY, UserJwtGuard, UserRoleGuard } from '../guard'

export const JwtBearerAuthorized = (
  role: USER_ROLE = USER_ROLE.ANONYMOUS,
): MethodDecorator => {
  return applyDecorators(
    ApiBearerAuth(),
    SetMetadata(USER_ROLE_METADATA_KEY, role),
    UseGuards(UserJwtGuard, UserRoleGuard),
  )
}
