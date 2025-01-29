import { ApiProperty } from '@nestjs/swagger'
import { PrimaryGeneratedColumn } from 'typeorm'
import { AuditableEntity } from './auditable.entity'

export abstract class CommonEntity extends AuditableEntity {
  @ApiProperty({ example: 1, description: 'ID' })
  @PrimaryGeneratedColumn({ type: 'int', comment: 'ID' })
  readonly id!: number
}
