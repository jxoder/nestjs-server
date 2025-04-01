import { CommonEntity, EntityColumn } from '@slibs/database'
import { Entity } from 'typeorm'
import { USER_ROLE } from '../constants'

@Entity({ name: 'user' })
export class UserEntity extends CommonEntity {
  @EntityColumn({
    type: 'varchar',
    length: 20,
    comment: 'nickname',
    nullable: true,
  })
  name!: string | null

  @EntityColumn({
    type: 'enum',
    enum: USER_ROLE,
    comment: 'user role',
    nullable: false,
  })
  role!: USER_ROLE
}
