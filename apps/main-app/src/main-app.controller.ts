import { Body, Controller, Get, Post } from '@nestjs/common'
import { IsString } from 'class-validator'
import { MainAppService } from './main-app.service'

class InputRequestDto {
  @IsString()
  name!: string
}

@Controller()
export class MainAppController {
  constructor(private readonly mainAppService: MainAppService) {}

  @Get()
  getHello(): string {
    return this.mainAppService.getHello()
  }

  @Post()
  postHello(@Body() body: InputRequestDto) {
    return { message: `accepted ${body.name}` }
  }
}
