import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTodoDto {
    @ApiProperty({ maxLength: 255, description: 'The content of the todo' })
    @IsString()
    @MaxLength(255)
    todo: string;
  
    @ApiPropertyOptional({ description: 'Completion status', default: false})
    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean;
}
