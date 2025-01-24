import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MalaysiaRegion } from './create-product.dto';

export class UpdateProductDto {
  @ApiProperty({
    description: "Product's location",
    enum: MalaysiaRegion,
    example: MalaysiaRegion.WEST_MALAYSIA,
  })
  @IsEnum(MalaysiaRegion)
  @IsOptional()
  location: MalaysiaRegion;

  @ApiProperty({ description: "Product's price", example: '100' })
  @IsString()
  @IsOptional()
  price: string;

  @ApiProperty({
    description: "Product's code",
    example: '1000',
  })
  @IsOptional()
  @IsString()
  productCode: string;

  @ApiProperty({
    description: "Product's description",
    example: 'Sedan',
  })
  @IsOptional()
  @IsString()
  productDescription: string;
}
