import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { OkResponseDto } from '../dto'

@ApiTags('health check')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'health check' })
  @ApiResponse({ type: OkResponseDto })
  check(): OkResponseDto {
    return OkResponseDto.from()
  }
}
