import {
  AuditableEntity,
  EntityColumn,
  EntityJoinColumn,
} from '@slibs/database'
import { Entity, Index, ManyToOne } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity({ name: 'bearer_refresh_token' })
@Index(['expiredAt'], { unique: false })
export class BearerRefreshTokenEntity extends AuditableEntity {
  @EntityColumn({
    type: 'varchar',
    length: 36,
    comment: 'token (uuid)',
    primary: true,
  })
  readonly token!: string

  @EntityColumn({ type: 'int', comment: 'user id', nullable: false })
  userId!: number

  @ManyToOne(() => UserEntity, { eager: false, nullable: false })
  @EntityJoinColumn({ name: 'userId' })
  user!: UserEntity

  @EntityColumn({ type: 'timestamp', comment: 'expired at', nullable: false })
  expiredAt!: Date

  @EntityColumn({ type: 'timestamp', comment: 'last used at', nullable: false })
  accessedAt!: Date
}
