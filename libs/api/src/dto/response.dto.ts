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

export class ListResponseDto extends CommonResponseDto {
  @ApiProperty({ example: 1, description: 'page index' })
  page!: number

  @ApiProperty({ example: 10, description: 'page size' })
  size!: number

  @ApiProperty({ example: 10, description: 'total count' })
  total!: number

  static from<T>(
    list: T[],
    total: number,
    page: number = 1,
    size: number = 10,
  ) {
    return {
      ...OkResponseDto.from(),
      list,
      total,
      page,
      size,
    }
  }
}
