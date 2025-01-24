import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOperation({ summary: 'Get products' })
  @ApiResponse({ status: 200, description: 'List of products' })
  @Get()
  getAll(
    @Query('productCode') productCode: string,
    @Query('location') location: string,
  ) {
    return this.productService.findAll({
      productCode,
      location,
    });
  }

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({ status: 201, description: 'Product created' })
  create(
    @Body()
    { location, price, productCode, productDescription }: CreateProductDto,
  ) {
    return this.productService.create({
      location,
      price,
      productCode,
      productDescription,
    });
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product updated' })
  update(
    @Query('productCode') productCode: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update({
      ...updateProductDto,
      productCode,
    });
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product deleted' })
  delete(@Query('productCode') productCode: string) {
    return this.productService.delete(productCode);
  }
}
