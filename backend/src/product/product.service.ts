import {
  HttpCode,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}
  findAll({
    productCode,
    location,
  }: Pick<Product, 'productCode' | 'location'>): Promise<Product[]> {
    switch (location) {
      case 'east':
        return this.productsRepository.find({
          where: {
            productCode,
            location: 'East Malaysia',
          },
        });
      case 'west':
        return this.productsRepository.find({
          where: {
            productCode,
            location: 'West Malaysia',
          },
        });
      default:
        return this.productsRepository.find();
    }
  }

  findOne(productId: number) {
    return this.productsRepository.findOneBy({ id: productId });
  }

  create({
    location,
    price,
    productCode,
    productDescription,
  }: CreateProductDto): Promise<Product> {
    const newProduct = this.productsRepository.create({
      price,
      productCode,
      productDescription,
      location,
    });

    return this.productsRepository.save(newProduct);
  }

  async update({ productCode, ...rest }: Omit<Product, 'id'>) {
    console.log({ productCode, rest });
    try {
      const updatedProduct = await this.productsRepository.update(
        { productCode },
        { ...rest },
      );

      if (updatedProduct.affected === 0) {
        throw new NotFoundException();
      }

      return this.productsRepository.findOneBy({ productCode });
    } catch {
      throw new NotFoundException();
    }
  }

  @HttpCode(HttpStatus.OK)
  async delete(productCode: string) {
    const deleted = await this.productsRepository.delete({ productCode });
    if (deleted.affected === 0) {
      throw new NotFoundException();
    }

    return {
      message: 'Product deleted',
    };
  }
}
