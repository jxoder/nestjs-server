import { ApiProperty } from '@nestjs/swagger'
import { ListResponseDto } from '@slibs/api'
import { SettingDto } from '@slibs/settings'

export class ListSettingsResponse extends ListResponseDto {
  @ApiProperty({ type: [SettingDto], description: 'list' })
  list!: Array<SettingDto>
}
