import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { OkResponse } from '@slibs/core'

@Controller('health')
export class HealthController {
  @Get()
  @ApiResponse({ type: OkResponse })
  @ApiOperation({ summary: 'check health' })
  healthy() {
    return OkResponse.from()
  }
}
