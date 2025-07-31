import { Controller, Get, Logger } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { HealthcheckResponseDto } from './dtos';


@Controller('health-check')
export class HealthcheckController {
  private readonly logger = new Logger(HealthcheckController.name, { timestamp: true });

  @ApiOperation({
      summary: 'Health check route',
      description: 'Return response based on application health',
    })   
    @ApiOkResponse({
      description: 'Health check successfull response',
      type: HealthcheckResponseDto,
    })
     @ApiInternalServerErrorResponse({
    description: 'Health check failed response',
    schema: {
      example: {
        success: false,
      },
    },
  })
  @Get()
  healthCeck(){
    this.logger.log("Health check executed successfully")
    return {success: true}
  }
}
