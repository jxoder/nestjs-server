import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { CryptoUtils, ERROR_MESSAGE } from '@slibs/common'
import { Transactional } from 'typeorm-transactional'
import { USER_ROLE } from '../constants'
import { EmailAccountRepository, UserRepository } from '../repository'

@Injectable()
export class EmailAccountService {
  constructor(
    private readonly emailAccountRepository: EmailAccountRepository,
    private readonly userRepository: UserRepository,
  ) {}

  @Transactional()
  async sign(input: {
    email: string
    password: string
    name?: string
    role?: USER_ROLE
  }) {
    const role = input.role ?? USER_ROLE.USER

    const exists = await this.emailAccountRepository.findOneBy({
      email: input.email,
    })

    if (exists) {
      throw new ConflictException(`${ERROR_MESSAGE.DUPLICATED}_EMAIL_ACCOUNT`) // duplicated error message
    }

    const userId = await this.userRepository.insert({ name: input.name, role })

    const hashedPassword = await CryptoUtils.genSaltedStr(input.password)
    await this.emailAccountRepository.insert({
      userId,
      email: input.email,
      password: hashedPassword,
    })
  }

  async login(input: { email: string; password: string }) {
    const emailAccount = await this.emailAccountRepository.findOneBy({
      email: input.email,
    })

    if (!emailAccount) {
      throw new UnauthorizedException(ERROR_MESSAGE.INVALID_CREDENTIAL)
    }

    const checkPassword = await CryptoUtils.compareSalted(
      input.password,
      emailAccount.password,
    )

    if (!checkPassword) {
      throw new UnauthorizedException(ERROR_MESSAGE.INVALID_CREDENTIAL)
    }

    await this.emailAccountRepository.update(emailAccount.id, {
      loggedAt: new Date(),
    })

    return this.userRepository.findOneByOrFail({ id: emailAccount.userId })
  }
}
