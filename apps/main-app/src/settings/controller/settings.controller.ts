import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SettingService } from '@slibs/settings'
import { JwtBearerAuthorized } from '@slibs/user'
import { ListSettingsResponse } from '../dto'

@ApiTags('Srv Settings')
@Controller({ path: 'settings' })
export class SettingsController {
  constructor(private readonly settingService: SettingService) {}

  @JwtBearerAuthorized()
  @Get()
  @ApiOperation({ summary: 'get all settings' })
  @ApiResponse({ type: ListSettingsResponse })
  async list() {
    const settings = await this.settingService.list()
    return ListSettingsResponse.from(
      settings,
      settings.length,
      1,
      settings.length,
    )
  }
}
