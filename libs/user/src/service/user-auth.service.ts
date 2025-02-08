import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DayUtils, JWTUtils, RandomUtils } from '@slibs/common'
import { IUserConfig, USER_CONFIG_KEY } from '../config'
import { BearerRefreshTokenEntity } from '../entities'
import { BearerRefreshTokenRepository } from '../repository'

@Injectable()
export class UserAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly bearerRefreshTokenRepository: BearerRefreshTokenRepository,
  ) {}

  private get config() {
    return this.configService.getOrThrow<IUserConfig>(USER_CONFIG_KEY)
  }

  async getRefreshToken(userId: number) {
    const exists =
      await this.bearerRefreshTokenRepository.findActiveTokenByUserId(userId)

    if (exists) return exists

    const token = RandomUtils.uuidV4()
    await this.bearerRefreshTokenRepository.insert({
      token,
      userId,
      expiredAt: this.getExpiredAtFromNow(
        this.config.REFRESH_EXPIRES_IN_SECONDS,
      ),
      accessedAt: DayUtils.getNowDate(),
    })

    return this.bearerRefreshTokenRepository.findOneByOrFail({ token })
  }

  async renewRefreshToken(entity: BearerRefreshTokenEntity) {
    const now = DayUtils.getNowDate()
    await this.bearerRefreshTokenRepository.update(entity.token, {
      expiredAt: this.getExpiredAtFromNow(
        this.config.REFRESH_EXPIRES_IN_SECONDS,
      ),
      accessedAt: now,
    })
  }

  async findOneByToken(token: string) {
    return this.bearerRefreshTokenRepository.findOneBy({ token })
  }

  validateRefreshToken(entity: BearerRefreshTokenEntity) {
    return DayUtils.isAfterNow(entity.expiredAt)
  }

  async createAccessToken(userId: number) {
    return JWTUtils.sign(
      { sub: userId },
      {
        secret: this.config.JWT_SECRET,
        expiresIn: this.config.JWT_EXPIRES_IN_SECONDS,
      },
    )
  }

  getExpiredAtFromNow(inSeconds: number) {
    return DayUtils.getNow().add(inSeconds, 'seconds').toDate()
  }
}
