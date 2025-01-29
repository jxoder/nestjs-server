import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import {
  Column,
  ColumnOptions,
  PrimaryColumn,
  PrimaryColumnOptions,
} from 'typeorm'

export type EntityColumnOptions = ColumnOptions & {
  primary?: boolean // is primary column
  exclude?: boolean // is exclude for dto
  example?: any // data example for swagger
}

export const EntityColumn = (options: EntityColumnOptions) => {
  const decorators: Array<
    ClassDecorator | MethodDecorator | PropertyDecorator
  > = []
  const { primary, exclude, example, ...columnOptions } = options

  // exclude decorator
  if (options?.exclude) decorators.push(Exclude())

  // set api property options
  let apiPropertyOptions: ApiPropertyOptions = {}
  if (example) apiPropertyOptions.example = example
  if (options?.comment) apiPropertyOptions.description = options.comment
  if (options?.nullable) apiPropertyOptions.nullable = options.nullable
  if (options?.default) apiPropertyOptions.default = options.default
  if (options?.enum) apiPropertyOptions.enum = Object.values(options.enum)
  if (options?.length) apiPropertyOptions.maxLength = Number(options.length)

  decorators.push(ApiProperty(apiPropertyOptions))
  decorators.push(
    options?.primary
      ? PrimaryColumn(columnOptions as PrimaryColumnOptions)
      : Column(columnOptions),
  )
  return applyDecorators(...decorators)
}
