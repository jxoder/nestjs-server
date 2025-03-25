import { Controller, Get, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'

@Controller()
export class ApiGatewayController {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  @Get()
  async getHello() {
    const obs = this.client.send('login', {
      email: 'example@example.com',
      password: '12345',
    })

    const res = await lastValueFrom(obs).catch(ex => ex)

    return res
  }

  @Get('event')
  event() {
    return this.client.emit('event', { message: 'Hello World' })
  }
}
