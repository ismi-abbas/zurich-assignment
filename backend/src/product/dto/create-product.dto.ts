import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum MalaysiaRegion {
  EAST_MALAYSIA = 'East Malaysia',
  WEST_MALAYSIA = 'West Malaysia',
}

export class CreateProductDto {
  @ApiProperty({
    description: "Product's location",
    enum: MalaysiaRegion,
    example: MalaysiaRegion.WEST_MALAYSIA,
  })
  @IsEnum(MalaysiaRegion)
  @IsNotEmpty()
  location: MalaysiaRegion;

  @ApiProperty({ description: "Product's price", example: '100' })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    description: "Product's code",
    example: '1000',
  })
  @IsString()
  @IsNotEmpty()
  productCode: string;

  @ApiProperty({
    description: "Product's description",
    example: 'Sedan',
  })
  @IsString()
  @IsNotEmpty()
  productDescription: string;
}
