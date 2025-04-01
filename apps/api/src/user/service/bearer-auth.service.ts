import { Inject, Injectable } from '@nestjs/common'
import { DayUtils, JWTUtils, RandomUtils } from '@slibs/core'
import { configKey, ConfigType } from '../../config'
import { USER_ROLE } from '../constants'
import { UserEntity } from '../entities'
import { BearerRefreshTokenRepository } from '../repository'

@Injectable()
export class BearerAuthService {
  constructor(
    @Inject(configKey) private readonly config: ConfigType,
    private readonly bearerRefreshTokenRepository: BearerRefreshTokenRepository,
  ) {}

  async createRefreshToken(userId: number) {
    const token = RandomUtils.uuidV4()
    await this.bearerRefreshTokenRepository.insert({
      token,
      userId,
      accessedAt: DayUtils.getNowDate(),
      expiredAt: DayUtils.getNow()
        .add(this.config.USER_REFRESH_TOKEN_EXPIRES_IN, 'seconds')
        .toDate(),
    })

    return token
  }

  async getRefreshToken(token: string) {
    return this.bearerRefreshTokenRepository.findOneBy({ token })
  }

  async signAccessToken(user: Pick<UserEntity, 'id' | 'role'>) {
    return JWTUtils.sign(
      { sub: user.id, r: user.role },
      {
        secret: this.config.USER_JWT_SECRET,
        expiresIn: this.config.USER_JWT_EXPIRES_IN,
      },
    )
  }

  async verifyAccessToken(token: string) {
    return JWTUtils.verify<{ sub: number; r: USER_ROLE }>(
      token,
      this.config.USER_JWT_SECRET,
    )
  }
}
