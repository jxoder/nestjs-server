import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { ApiResponse } from './api.response'

export class ApiClient {
  constructor(protected readonly app: INestApplication) {}

  async get<RESPONSE = any>(path: string) {
    const req = request(this.app.getHttpServer()).get(path)

    const res = await req
    return new ApiResponse<RESPONSE>(res)
  }

  async post<RESPONSE = any>(path: string, payload?: any) {
    const req = request(this.app.getHttpServer()).post(path)

    if (payload) {
      req.send(payload)
    }

    const res = await req
    return new ApiResponse<RESPONSE>(res)
  }
}
