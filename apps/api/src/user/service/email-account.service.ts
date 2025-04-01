import { Injectable, Logger } from '@nestjs/common'
import {
  CoreException,
  CryptoUtils,
  DayUtils,
  EXCEPTION_TYPE,
  RandomUtils,
} from '@slibs/core'
import Redis from 'ioredis'
import { Transactional } from 'typeorm-transactional'
import { USER_ROLE } from '../constants'
import {
  LoginEmailAccountPayload,
  SendVerifyCodeRequestPayload,
  SignEmailAccountPayload,
} from '../dto'
import { EmailAccountRepository, UserRepository } from '../repository'

@Injectable()
export class EmailAccountService {
  private readonly logger = new Logger(this.constructor.name)

  constructor(
    private readonly redis: Redis,
    private readonly emailAccountRepository: EmailAccountRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async sendVerifyCode(payload: SendVerifyCodeRequestPayload) {
    const { email } = payload

    const exists = await this.emailAccountRepository.findOneBy({ email })
    if (exists) {
      throw new CoreException(
        EXCEPTION_TYPE.ALREADY_EXISTS,
        'email already exists',
      )
    }

    // TODO: send verify code
    const code = RandomUtils.randomNumberDigits(6)
    await this.redis.set(`verify-code:${email}`, code, 'EX', 3 * 60) // 3 minutes

    this.logger.log(`Verify code sent to ${email}: ${code}`)
  }

  @Transactional()
  async sign(payload: SignEmailAccountPayload, role = USER_ROLE.USER) {
    const { email, password, name, code } = payload

    const verifyCode = await this.redis.get(`verify-code:${email}`)
    if (!verifyCode || verifyCode !== code) {
      throw new CoreException(
        EXCEPTION_TYPE.INVALID_CREDENTIAL,
        'invalid verify code',
      )
    }

    await this.redis.del(`verify-code:${email}`)

    const userId = await this.userRepository.insert({ name, role })
    const hashed = await CryptoUtils.genSaltedStr(password)
    await this.emailAccountRepository.insert({
      userId,
      email,
      password: hashed,
    })
  }

  async login(payload: LoginEmailAccountPayload) {
    const { email, password } = payload

    const exists = await this.emailAccountRepository.findOneBy({ email })
    if (!exists) {
      throw new CoreException(EXCEPTION_TYPE.INVALID_CREDENTIAL)
    }

    const check = await CryptoUtils.compareSalted(password, exists.password)

    if (!check) {
      throw new CoreException(EXCEPTION_TYPE.INVALID_CREDENTIAL)
    }

    await this.emailAccountRepository.update(exists.id, {
      loggedAt: DayUtils.getNowDate(),
    })

    return this.userRepository.findOneByOrFail({ id: exists.userId })
  }
}
