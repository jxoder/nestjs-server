import { Controller } from '@nestjs/common'
import { EventPattern, MessagePattern } from '@nestjs/microservices'
import { IsEmail, IsNotEmpty } from 'class-validator'

class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string

  @IsNotEmpty()
  password!: string
}

@Controller()
export class AuthController {
  @MessagePattern('health')
  health() {
    return { status: 'OK' }
  }

  @MessagePattern('login')
  async login22(data: LoginDto) {
    return { data, status: 'OK' }
  }

  @EventPattern('event')
  event(data: any) {
    console.log(data)
    return { data, status: 'OK' }
  }
}
