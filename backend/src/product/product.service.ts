import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}
  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
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

  update(
    productId: number,
    { location, price, productCode, productDescription }: Product,
  ) {
    return this.productsRepository.update(productId, {
      price,
      productCode,
      productDescription,
      location,
    });
  }

  delete(productId: number) {
    return this.productsRepository.delete({ id: productId });
  }
}
