import {
  IsOptional,
  IsNumber,
} from 'class-validator';

export class ListUserQuery {
  @IsNumber()
  @IsOptional()
  limit: number;

  @IsNumber()
  @IsOptional()
  next: number;
}
