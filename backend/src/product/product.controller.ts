import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOperation({ summary: 'Get products' })
  @ApiResponse({ status: 200, description: 'List of products' })
  @Get()
  getAll() {
    return this.productService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  // @Roles('admin')
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
}
