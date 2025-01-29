import { BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm'
import { EntityColumn } from '../decorator'

export abstract class AuditableEntity extends BaseEntity {
  @EntityColumn({ type: 'timestamp', comment: 'created at', nullable: false })
  createdAt!: Date

  @EntityColumn({ type: 'timestamp', comment: 'updated at', nullable: false })
  updatedAt!: Date

  @BeforeInsert()
  beforeInsert() {
    const now = new Date()
    this.createdAt = now
    this.updatedAt = now
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date()
  }
}
