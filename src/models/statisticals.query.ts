import {
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';

export class ListUserQuery {
  @IsNumber()
  @IsOptional()
  limit: number;

  @IsString()
  @IsOptional()
  next: string;

}

