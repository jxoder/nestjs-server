import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export class CommonApiResponse {
  @ApiProperty({ example: 200, description: 'http status code' })
  code!: number

  @ApiProperty({ example: 'OK', description: 'response message' })
  message!: string
}

export class OkResponse extends CommonApiResponse {
  static from(): OkResponse {
    return {
      code: HttpStatus.OK,
      message: 'OK',
    }
  }
}
