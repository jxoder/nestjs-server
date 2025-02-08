import { INestApplication } from '@nestjs/common'
import { ApiClient, initializeApplication } from '@slibs/testing'
import { DataSource } from 'typeorm'
import { MainAppModule } from '../../src/main-app.module'

let app: INestApplication

export const ba = async () => {
  app = await initializeApplication(MainAppModule)
  await app.get(DataSource).synchronize()
}

export const aa = async () => {
  await app.get(DataSource).destroy()
  await app.close()
}

export const clearDatabase = async () => {
  await app.get(DataSource).synchronize(true)
}

export const getApplication = () => {
  if (!app) {
    throw new Error(`require initalize app`)
  }
  return app
}

export const createClient = () => {
  return new ApiClient(getApplication())
}
