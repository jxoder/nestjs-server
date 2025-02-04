import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export class CommonResponseDto {
  @ApiProperty({ example: HttpStatus.OK, description: 'http status code' })
  code!: number

  @ApiProperty({ example: 'OK', description: 'response message' })
  message!: string
}

export class OkResponseDto extends CommonResponseDto {
  static from(): OkResponseDto {
    return {
      code: HttpStatus.OK,
      message: 'OK',
    }
  }
}
