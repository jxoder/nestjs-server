import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { USER_ROLE, USER_ROLE_PRIV } from '../constants'

export const USER_ROLE_METADATA_KEY = 'user-role'

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<USER_ROLE>(
      USER_ROLE_METADATA_KEY,
      context.getHandler(),
    )

    const req = context.switchToHttp().getRequest()

    if (!req?.user || !req?.user?.role) throw new UnauthorizedException()

    const userRole = (req.user.role ?? USER_ROLE.ANONYMOUS) as USER_ROLE

    if (USER_ROLE_PRIV[userRole] < USER_ROLE_PRIV[role])
      throw new UnauthorizedException()

    return true
  }
}
