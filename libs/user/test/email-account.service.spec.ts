import { Test, TestingModule } from '@nestjs/testing'
import { CommonModule } from '@slibs/common'
import { ERROR_MESSAGE } from '@slibs/common/exception'
import { DatabaseModule } from '@slibs/database'
import { UserModule } from '@slibs/user'
import { UserRepository } from '@slibs/user/repository'
import { EmailAccountService } from '@slibs/user/service'
import { DataSource } from 'typeorm'

describe('email-account.service', () => {
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [CommonModule, DatabaseModule.forRoot(), UserModule],
    }).compile()

    await module.get(DataSource).synchronize(true)
  })

  afterAll(async () => {
    await module.get(DataSource).destroy()
  })

  it('should be defined', () => {
    expect(module.get(EmailAccountService)).toBeDefined()
  })

  it('sign', async () => {
    const service = module.get(EmailAccountService)

    // sign
    await service.sign({
      email: 'test@test.com',
      password: 'test',
    })

    // duplicated
    await expect(
      service.sign({
        email: 'test@test.com',
        password: 'test',
      }),
    ).rejects.toThrow('DUPLICATED_EMAIL_ACCOUNT')

    const res = await module.get(UserRepository).findBy({})
    expect(res).toHaveLength(1)
  })

  it('login', async () => {
    const service = module.get(EmailAccountService)

    // not found email
    await expect(
      service.login({
        email: 'wrong@test.com',
        password: 'test',
      }),
    ).rejects.toThrow(ERROR_MESSAGE.INVALID_CREDENTIAL)

    // wrong password
    await expect(
      service.login({
        email: 'test@test.com',
        password: 'wrong',
      }),
    ).rejects.toThrow(ERROR_MESSAGE.INVALID_CREDENTIAL)

    const res = await service.login({
      email: 'test@test.com',
      password: 'test',
    })
    expect(res).toEqual({ email: 'test@test.com', userId: 1 })
  })
})
