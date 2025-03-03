import { DynamicModule, Module } from '@nestjs/common'
import { DatabaseModule } from '@slibs/database'
import { SettingEntity } from './entities'
import { SettingRepository } from './repository'
import { SettingService } from './service'
import { ISettingOption } from './types'

@Module({})
export class SettingsModule {
  static options: Array<ISettingOption> = []

  static forRoot(): DynamicModule {
    return {
      global: true,
      module: this,
      imports: [DatabaseModule.forFeature([SettingEntity])],
      providers: [
        {
          provide: 'SETTINGS_MODULE_OPTIONS',
          useFactory: () => this.options,
        },
        SettingRepository,
        SettingService,
      ],
      exports: [SettingService],
    }
  }

  static forFeature(options: Array<ISettingOption>): DynamicModule {
    // validate options
    for (const option of options) {
      if (option.value && typeof option.value !== option.type)
        throw new Error(
          `Invalid value for ${option.key}, got ${typeof option.value}`,
        )

      if (option.key !== option.key.toUpperCase())
        throw new Error(
          `Invalid key for ${option.key}, only uppercase is allowed`,
        )
    }

    // check for duplicate keys
    const updates = [...new Set([...this.options, ...options].map(o => o.key))]
    if (updates.length !== options.length + this.options.length)
      throw new Error('Duplicate key in options')

    this.options = [...this.options, ...options]
    return {
      module: this,
    }
  }
}
