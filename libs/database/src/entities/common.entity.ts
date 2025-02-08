import { EntityPrimaryGeneratedColumn } from '../decorator'
import { AuditableEntity } from './auditable.entity'

export abstract class CommonEntity extends AuditableEntity {
  @EntityPrimaryGeneratedColumn({ type: 'int', comment: 'ID' })
  readonly id!: number
}
