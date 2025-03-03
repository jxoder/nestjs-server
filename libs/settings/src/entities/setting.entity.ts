import { CommonEntity, EntityColumn } from '@slibs/database'
import { Entity } from 'typeorm'

@Entity({ name: 'setting' })
export class SettingEntity extends CommonEntity {
  @EntityColumn({
    primary: true,
    type: 'varchar',
    length: 40,
    comment: 'setting key',
  })
  key!: string

  @EntityColumn({ type: 'jsonb', comment: 'setting value', default: '{}' })
  value!: Record<string, any>
}
