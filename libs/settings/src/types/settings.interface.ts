export interface ISettingOption {
  key: string
  type: 'string' | 'number' | 'boolean' | 'object'
  value?: any // default value
  description?: string
}
