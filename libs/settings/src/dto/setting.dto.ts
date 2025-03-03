import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class SettingDto {
  @ApiProperty({ example: 'KEY', description: 'key' })
  key!: string

  @ApiProperty({ example: 'string', description: 'value type' })
  type!: string

  @ApiProperty({ example: 'value', description: 'value' })
  value!: any

  @ApiPropertyOptional({ example: 'description', description: 'description' })
  description?: string

  @ApiPropertyOptional({ example: '2021-01-01', description: 'updated at' })
  updatedAt!: Date | null
}
