import { applyDecorators } from '@nestjs/common'
import { JoinColumn, JoinColumnOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export const EntityJoinColumn = (options: JoinColumnOptions) => {
  // convert column name to relation name, snake case
  if (options.name)
    options.name = new SnakeNamingStrategy().relationName(options.name)

  return applyDecorators(JoinColumn({ ...options }))
}
