import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { CoreException, DayUtils, EXCEPTION_TYPE } from '@slibs/core'
import { Request } from 'express'
import { Strategy } from 'passport-custom'
import { BearerAuthService } from '../service'

@Injectable()
export class UserRefreshStrategy extends PassportStrategy(
  Strategy,
  'user-refresh',
) {
  constructor(private readonly bearerAuthService: BearerAuthService) {
    super()
  }

  async validate(req: Request) {
    const token = req.get('Authorization')?.replace('Bearer ', '')

    if (!token || !token.trim())
      throw new CoreException(EXCEPTION_TYPE.UNAUTHORIZED)

    const entity = await this.bearerAuthService.getRefreshToken(token)

    if (!entity) throw new CoreException(EXCEPTION_TYPE.UNAUTHORIZED)

    if (DayUtils.getNow().isAfter(entity.expiredAt))
      throw new CoreException(EXCEPTION_TYPE.UNAUTHORIZED)

    return { id: entity.userId }
  }
}
