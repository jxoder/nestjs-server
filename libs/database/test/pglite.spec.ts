import { MemoryFS, PGlite } from '@electric-sql/pglite'

describe('pglite', () => {
  it('Query:: SELECT 1', async () => {
    const db = new PGlite({ fs: new MemoryFS() })
    expect(await db.query('SELECT 1')).toMatchSnapshot()
  })
})
