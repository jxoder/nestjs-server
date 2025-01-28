import { INestApplication, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { COMMON_CONFIG_KEY, ICommonConfig } from '@slibs/common'
import cluster from 'cluster'
import { Request, Response } from 'express'
import { mw } from 'request-ip'
import { API_CONFIG_KEY, IApiConfig } from '../config'
import { setupSwagger } from './swagger.setup'

export class Bootstrap {
  constructor(private readonly module: any) {}

  async listen() {
    const app = await NestFactory.create<INestApplication>(this.module)
    const configService = app.get(ConfigService)

    const commonConfig =
      configService.getOrThrow<ICommonConfig>(COMMON_CONFIG_KEY)
    const apiConfig = configService.getOrThrow<IApiConfig>(API_CONFIG_KEY)

    app.use(mw())
    app.use('/favicon.ico', (_: Request, res: Response) => {
      res.status(204).end()
    })

    app.useLogger([commonConfig.LOG_LEVEL])
    app.enableVersioning({ type: VersioningType.URI })

    app.enableCors({
      origin: apiConfig.ORIGINS.length > 0 ? apiConfig.ORIGINS : '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })

    setupSwagger(app, apiConfig)

    await app.listen(apiConfig.PORT)
  }

  async single() {
    return this.listen()
  }

  async clusterize(nums: number = 2) {
    if (cluster.isPrimary) {
      for (let i = 0; i < nums; i++) {
        cluster.fork()
      }
      cluster.on('exit', (worker, _code, _signal) => {
        console.log(`worker ${worker.process.pid} died. restaring`)
        cluster.fork()
      })
    } else {
      this.listen()
    }
  }
}
