import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { ApiResponse } from './api.response'

export class ApiClient {
  private token?: string

  constructor(protected readonly app: INestApplication) {}

  // if token is null, remove token
  setToken(token: string | null) {
    this.token = token ?? undefined
  }

  async get<RESPONSE = any>(path: string) {
    const req = request(this.app.getHttpServer()).get(path)

    if (this.token) {
      req.set('Authorization', `Bearer ${this.token}`)
    }

    const res = await req
    return new ApiResponse<RESPONSE>(res)
  }

  async post<RESPONSE = any>(path: string, payload?: any) {
    const req = request(this.app.getHttpServer()).post(path)

    if (payload) {
      req.send(payload)
    }

    if (this.token) {
      req.set('Authorization', `Bearer ${this.token}`)
    }

    const res = await req
    return new ApiResponse<RESPONSE>(res)
  }
}
