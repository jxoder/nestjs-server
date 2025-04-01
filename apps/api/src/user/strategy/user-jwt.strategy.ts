import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { CoreException, EXCEPTION_TYPE } from '@slibs/core'
import { Request } from 'express'
import { Strategy } from 'passport-custom'
import { configKey, ConfigType } from '../../config'
import { BearerAuthService } from '../service'

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  constructor(
    @Inject(configKey) private readonly config: ConfigType,
    private readonly bearerAuthService: BearerAuthService,
  ) {
    super()
  }

  async validate(req: Request) {
    const token = req.get('Authorization')?.replace('Bearer ', '')

    if (!token) throw new CoreException(EXCEPTION_TYPE.UNAUTHORIZED)

    const parsed = await this.bearerAuthService.verifyAccessToken(token)

    if (!parsed) throw new CoreException(EXCEPTION_TYPE.UNAUTHORIZED)

    return { id: parsed.sub, role: parsed.r }
  }
}
