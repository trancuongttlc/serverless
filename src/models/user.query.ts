import {
  IsString,
  IsOptional,
} from 'class-validator';

export class ListUserQuery {
  @IsString()
  @IsOptional()
  limit: number;

  @IsString()
  @IsOptional()
  next: string;
}
