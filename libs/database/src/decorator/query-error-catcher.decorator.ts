import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common'
import { QueryFailedError } from 'typeorm'

export function QueryErrorCatcher(): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const origin = descriptor.value
    descriptor.value = function (...args: any[]) {
      return origin.apply(this, args).catch((ex: any) => {
        if (ex instanceof QueryFailedError) {
          const err = ex.driverError

          // duplicated key
          if (err.message.startsWith('duplicate key value')) {
            const table = (err.table ?? 'unknown').toUpperCase()
            if (table === 'UNKNOWN') {
              console.error(ex.driverError)
            }
            throw new ConflictException(`DUPLICATED_${table}`)
          }

          // required field
          if (err.column) {
            throw new BadRequestException(
              `REQUIRED_${err.column.toUpperCase()}`,
            )
          }
        }

        // unhandled error
        console.error(ex)
        throw new InternalServerErrorException()
      })
    }

    return descriptor
  }
}
