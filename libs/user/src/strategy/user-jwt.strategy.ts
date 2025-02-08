import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ERROR_MESSAGE, JWTUtils } from '@slibs/common'
import { Request } from 'express'
import { Strategy } from 'passport-custom'
import { IUserConfig, USER_CONFIG_KEY } from '../config'

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  constructor(private readonly configService: ConfigService) {
    super()
  }

  async validate(req: Request) {
    const token = req.get('Authorization')?.replace('Bearer ', '')

    if (!token) throw new UnauthorizedException()

    const parsedToken = await JWTUtils.verify<{ sub: number }>(
      token,
      this.configService.getOrThrow<IUserConfig>(USER_CONFIG_KEY).JWT_SECRET,
    ).catch(() => null)

    // expired or invalid token
    if (!parsedToken)
      throw new UnauthorizedException(ERROR_MESSAGE.INVALID_JWT_TOKEN)

    return { id: parsedToken.sub }
  }
}
