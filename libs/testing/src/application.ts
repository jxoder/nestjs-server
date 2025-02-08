import { MemoryFS, PGlite } from '@electric-sql/pglite'
import { INestApplication, VersioningType } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DatabaseModule } from '@slibs/database'
import { PGliteDriver } from 'typeorm-pglite'

export async function initializeApplication(
  module: any,
): Promise<INestApplication> {
  // mock database
  const pgLite = new PGlite({ fs: new MemoryFS() })
  DatabaseModule.dataSourceOptions = {
    type: 'postgres',
    driver: new PGliteDriver({ ...pgLite }).driver,
  }

  const moduleFixture = await Test.createTestingModule({
    imports: [module],
  }).compile()

  const app = moduleFixture.createNestApplication()

  app.enableVersioning({ type: VersioningType.URI })
  app.useLogger(false)

  await app.init()

  return app
}
