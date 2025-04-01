import { ApiProperty } from '@nestjs/swagger'
import { USER_ROLE } from '../constants'
import { UserEntity } from '../entities'

export class UserDto {
  @ApiProperty({ description: 'id' })
  id!: string

  @ApiProperty({ description: 'name' })
  name!: string

  static from(user: UserEntity) {
    return {
      id: user.id,
      name: user.name,
    }
  }
}

export class UserSelfDto extends UserDto {
  @ApiProperty({ example: USER_ROLE.USER, description: 'role' })
  role!: USER_ROLE

  static from(user: UserEntity) {
    return {
      ...super.from(user),
      role: user.role,
    }
  }
}
