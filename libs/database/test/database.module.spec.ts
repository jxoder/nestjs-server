import { Test, TestingModule } from '@nestjs/testing'
import { CommonModule } from '@slibs/common'
import { DatabaseModule } from '@slibs/database'
import { DataSource } from 'typeorm'

import { TestModule, TestService } from './test.classes'

describe.skip('database.module (real postgres)', () => {
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [CommonModule, DatabaseModule.forRoot(), TestModule],
    }).compile()

    // database synchronization
    await module.get(DataSource).synchronize(true)
  })

  afterAll(async () => {
    // destroy database connection
    await module.get(DataSource).destroy()
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
