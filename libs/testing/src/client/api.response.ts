import request from 'supertest'

export class ApiResponse<T = any> {
  constructor(public res: request.Response) {}

  get data(): T {
    return this.res.body as T
  }

  get error(): { code: number; message: string } {
    return this.res.body
  }

  expectSuccess() {
    expect(this.res.ok).toBeTruthy()
  }
}
