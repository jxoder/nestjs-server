import { Inject, Injectable } from '@nestjs/common'
import { In } from 'typeorm'
import { SettingDto } from '../dto'
import { SettingRepository } from '../repository'
import { ISettingOption } from '../types'

@Injectable()
export class SettingService {
  constructor(
    @Inject('SETTINGS_MODULE_OPTIONS')
    private readonly options: Array<ISettingOption>,
    private readonly settingRepository: SettingRepository,
  ) {}

  async get<T>(key: string): Promise<T | null> {
    const setting = await this.settingRepository.findOneBy({ key })

    if (!setting) {
      return (this.options.find(o => o.key === key)?.value as T) ?? null
    }

    return setting.value[key] as T
  }

  async set(key: string, value: any) {
    const option = this.options.find(o => o.key === key)

    // check if option exists
    if (!option) throw new Error(`Setting key ${key} not found`)

    // check if value is of the correct type
    if (typeof value !== option.type)
      throw new Error(`Invalid value for ${key}, got ${typeof option.type}`)

    const exists = await this.settingRepository.findOneBy({ key })

    if (!exists) {
      await this.settingRepository.insert({ key, value: { [key]: value } })
    } else {
      await this.settingRepository.update(exists.id, {
        value: { [key]: value },
      })
    }
  }

  async list(): Promise<Array<SettingDto>> {
    const keys = this.options.map(o => o.key)
    const settings = await this.settingRepository.findBy({ key: In(keys) })

    return this.options.map(o => {
      const setting = settings.find(s => s.key === o.key)
      return {
        key: o.key,
        type: o.type,
        value: setting?.value[o.key] ?? o.value ?? null,
        description: o.description,
        updatedAt: setting?.updatedAt ?? null,
      }
    })
  }
}
