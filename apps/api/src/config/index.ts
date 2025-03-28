import { ConfigType } from '@nestjs/config'
import configure from './configure'
export * from './configure'

export type Configure = ConfigType<typeof configure>
