import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Material } from 'generated/prisma/client';

export class CreateToyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(Material)
  material: Material;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  weight: number;
}

