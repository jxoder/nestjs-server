import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import {
  Column,
  ColumnOptions,
  PrimaryColumn,
  PrimaryColumnOptions,
  PrimaryGeneratedColumn,
} from 'typeorm'

export type EntityColumnOptions = ColumnOptions & {
  primary?: boolean // is primary column
  exclude?: boolean // is exclude for dto
  example?: any // data example for swagger
}

function trimComment(options: Record<string, any>) {
  if (process.env.ENV === 'test' && options?.comment) {
    delete options.comment
  }
}

export const EntityColumn = (options: EntityColumnOptions) => {
  const decorators: Array<
    ClassDecorator | MethodDecorator | PropertyDecorator
  > = []
  const { primary, exclude, example, ...columnOptions } = options

  // exclude decorator
  if (exclude) decorators.push(Exclude())

  // set api property options
  const apiPropertyOptions: ApiPropertyOptions = {}
  if (example) apiPropertyOptions.example = example
  if (options?.comment) apiPropertyOptions.description = options.comment
  if (options?.nullable) apiPropertyOptions.nullable = options.nullable
  if (options?.default) apiPropertyOptions.default = options.default
  if (options?.enum) apiPropertyOptions.enum = Object.values(options.enum)
  if (options?.length) apiPropertyOptions.maxLength = Number(options.length)

  trimComment(columnOptions)

  decorators.push(ApiProperty(apiPropertyOptions))
  decorators.push(
    primary
      ? PrimaryColumn(columnOptions as PrimaryColumnOptions)
      : Column(columnOptions),
  )
  return applyDecorators(...decorators)
}

export const EntityPrimaryGeneratedColumn = (options: {
  type: 'int'
  comment?: string
  example?: any
}) => {
  const { example, ...columnOptions } = options

  const apiPropertyOptions: ApiPropertyOptions = {}

  if (example) apiPropertyOptions.example = example
  if (options?.comment) apiPropertyOptions.description = options.comment

  trimComment(columnOptions)

  return applyDecorators(
    ApiProperty(apiPropertyOptions),
    PrimaryGeneratedColumn(columnOptions),
  )
}
