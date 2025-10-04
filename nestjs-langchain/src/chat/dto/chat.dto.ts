import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ChatDto {
  @IsString()
  prompt!: string;

  @IsOptional()
  @Type(() => Number)    
  @IsNumber()
  temperature?: number;
}
