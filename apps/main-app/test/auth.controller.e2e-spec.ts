import { HttpStatus } from '@nestjs/common'
import { ERROR_MESSAGE } from '@slibs/common'
import { aa, ba, createClient } from './harness'

describe('auth controller (e2e)', () => {
  beforeAll(ba)
  afterAll(aa)

  describe('email-account', () => {
    const EMAIL = 'sample@example.com'
    const PASSWORD = 'password'

    it('sign with email', async () => {
      const client = createClient()

      const r = await client.post('/auth/email-account/sign', {
        email: EMAIL,
        password: PASSWORD,
      })
      r.expectSuccess()

      const e1 = await client.post('/auth/email-account/sign', {
        email: 'invalid-email-format',
        password: PASSWORD,
      })
      expect(e1.error.code).toBe(HttpStatus.BAD_REQUEST)

      // duplicate email
      const e2 = await client.post('/auth/email-account/sign', {
        email: EMAIL,
        password: PASSWORD,
      })
      expect(e2.error.code).toBe(HttpStatus.CONFLICT)
      expect(e2.error.message).toBe(`DUPLICATED_EMAIL_ACCOUNT`)
    })

    it('login with email', async () => {
      const client = createClient()

      const r = await client.post('/auth/email-account/login', {
        email: EMAIL,
        password: PASSWORD,
      })
      r.expectSuccess()

      expect(r.data).toHaveProperty('accessToken')
      expect(r.data).toHaveProperty('refreshToken')
      expect(r.data).toHaveProperty('user')

      // invalid password
      const e1 = await client.post('/auth/email-account/login', {
        email: EMAIL,
        password: 'invalid-password',
      })
      expect(e1.error.code).toBe(HttpStatus.UNAUTHORIZED)
      expect(e1.error.message).toBe(ERROR_MESSAGE.INVALID_CREDENTIAL)

      // not exist account
      const e2 = await client.post('/auth/email-account/login', {
        email: 'no-exist@example.com',
        password: PASSWORD,
      })
      expect(e2.error.code).toBe(HttpStatus.UNAUTHORIZED)
      expect(e2.error.message).toBe(ERROR_MESSAGE.INVALID_CREDENTIAL)
    })
  })
})
