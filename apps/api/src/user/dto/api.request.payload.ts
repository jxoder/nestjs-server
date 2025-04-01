import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString } from 'class-validator'

export class SendVerifyCodeRequestPayload {
  @ApiProperty({ example: 'sample@example.com', description: 'email' })
  @IsEmail()
  email!: string
}

export class SignEmailAccountPayload {
  @ApiProperty({ example: 'sample@example.com', description: 'email' })
  @IsEmail()
  email!: string

  @ApiProperty({ example: 'password', description: 'password' })
  @IsString()
  password!: string

  @ApiPropertyOptional({ example: 'name', description: 'name' })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ example: '123456', description: 'verify code' })
  @IsString()
  code!: string
}

export class LoginEmailAccountPayload {
  @ApiProperty({ example: 'sample@example.com', description: 'email' })
  @IsEmail()
  email!: string

  @ApiProperty({ example: 'password', description: 'password' })
  @IsString()
  password!: string
}
