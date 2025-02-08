import { MemoryFS, PGlite } from '@electric-sql/pglite'
import { Test, TestingModule } from '@nestjs/testing'
import { CommonModule } from '@slibs/common'
import { DatabaseModule } from '@slibs/database'
import { DataSource } from 'typeorm'
import { PGliteDriver } from 'typeorm-pglite'
import { TestModule, TestService } from './test.classes'

const pgLite = new PGlite({ fs: new MemoryFS() })

describe('database.module (mock using pglite)', () => {
  let module: TestingModule

  beforeAll(async () => {
    DatabaseModule.dataSourceOptions = {
      type: 'postgres',
      driver: new PGliteDriver({ ...pgLite }).driver,
    }

    module = await Test.createTestingModule({
      imports: [CommonModule, DatabaseModule.forRoot(), TestModule],
    }).compile()

    await module.get(DataSource).synchronize(true)
  })

  it('should be defined', async () => {
    expect(module.get(TestService)).toBeDefined()
  })

  it('Basic CRUD', async () => {
    const service = module.get(TestService)

    // create
    const id = await service.insert({ name: 'test' })
    expect(id).toBeDefined()

    // update
    await service.update(id, { name: 'test2' })

    // find one by id
    const entity = await service.findOneBy({ id })
    expect(entity!.name).toBe('test2')

    // delete
    await service.delete(id)

    // check removed
    const entities = await service.find({})
    expect(entities.length).toBe(0)
  })
})
