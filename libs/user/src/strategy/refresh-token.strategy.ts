import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-custom'
import { UserAuthService } from '../service'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(private readonly userAuthService: UserAuthService) {
    super()
  }

  async validate(req: Request) {
    const token = req.get('Authorization')?.replace('Bearer ', '')

    if (!token || !token.trim()) throw new UnauthorizedException()

    const entity = await this.userAuthService.findOneByToken(token)
    if (!entity) throw new UnauthorizedException()

    const isValid = this.userAuthService.validateRefreshToken(entity)
    if (!isValid) throw new UnauthorizedException()

    return { id: entity.userId }
  }
}
