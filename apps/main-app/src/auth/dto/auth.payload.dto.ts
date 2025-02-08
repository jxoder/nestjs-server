import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString } from 'class-validator'

export class SignEmailAccountPayload {
  @ApiProperty({ example: 'sample@example.com', description: 'email' })
  @IsEmail()
  email!: string

  @ApiProperty({ example: 'password', description: 'password' })
  @IsString()
  password!: string

  @ApiPropertyOptional({ example: 'nickname', description: 'nickname' })
  @IsOptional()
  @IsString()
  name?: string
}

export class LoginEmailAccountPayload {
  @ApiProperty({ example: 'sample@example.com', description: 'email' })
  @IsEmail()
  email!: string

  @ApiProperty({ example: 'password', description: 'password' })
  @IsString()
  password!: string
}
