import { aa, ba, createClient } from './harness'

describe('health controller (e2e)', () => {
  beforeAll(ba)
  afterAll(aa)

  it('GET /health', async () => {
    const client = createClient()

    const r = await client.get('/health')
    r.expectSuccess()
  })
})
