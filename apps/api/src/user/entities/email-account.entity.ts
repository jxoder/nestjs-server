import { CommonEntity, EntityColumn, EntityJoinColumn } from '@slibs/database'
import { Entity, Index, OneToOne } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity({ name: 'email_account' })
@Index(['email'], { unique: true })
export class EmailAccountEntity extends CommonEntity {
  @EntityColumn({ type: 'varchar', comment: 'login email', nullable: false })
  email!: string

  @EntityColumn({
    type: 'varchar',
    comment: 'hashed password',
    nullable: false,
  })
  password!: string

  @EntityColumn({
    type: 'timestamp',
    comment: 'last logged at',
    nullable: true,
  })
  loggedAt!: Date | null

  @EntityColumn({ type: 'int', comment: 'user id', nullable: false })
  userId!: number

  @OneToOne(() => UserEntity, { eager: false, nullable: false })
  @EntityJoinColumn({ name: 'userId' })
  user!: UserEntity
}
