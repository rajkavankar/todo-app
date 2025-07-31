import { ApiProperty } from "@nestjs/swagger";

export class HealthcheckResponseDto {
    @ApiProperty()
    success: boolean;
  }