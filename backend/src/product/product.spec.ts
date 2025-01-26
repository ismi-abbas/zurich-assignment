import { Product } from '../entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { MalaysiaRegion } from './dto/create-product.dto';

describe('ProductServices', () => {
  let productController: ProductController;
  let productService: ProductService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const mockProducts = [
        {
          id: 1,
          productCode: '6519',
          location: 'West Malaysia',
          productDescription: 'SUV',
          price: '100',
        },
      ];
      jest.spyOn(productService, 'findAll').mockResolvedValue(mockProducts);

      const result = await productController.getAll('6519', 'west');
      expect(result).toEqual(mockProducts);
    });

    it('should return an empty array if no products are found', async () => {
      jest.spyOn(productService, 'findAll').mockResolvedValue([]);

      const result = await productController.getAll('6519', 'west');
      expect(result).toEqual([]);
    });

    it('should give error if wrong location is provided', async () => {
      jest
        .spyOn(productService, 'findAll')
        .mockRejectedValue(new NotFoundException('Location not found'));

      await expect(productController.getAll('6519', 'unknown')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const mockProduct = {
        id: 1,
        productCode: '6519',
        location: 'West Malaysia',
        productDescription: 'SUV',
        price: '100',
      };
      jest.spyOn(productService, 'create').mockResolvedValue(mockProduct);

      const result = await productController.create({
        location: MalaysiaRegion.WEST_MALAYSIA,
        price: '100',
        productCode: '6519',
        productDescription: 'SUV',
      });
      expect(result).toEqual(mockProduct);
    });

    it('should throw a NotFoundException if the product code already exists', () => {
      jest
        .spyOn(productService, 'create')
        .mockRejectedValue(
          new NotFoundException('Product code already exists'),
        );
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const mockProduct = {
        id: 1,
        productCode: '6519',
        location: 'West Malaysia',
        productDescription: 'SUV',
        price: '100',
      };
      jest.spyOn(productService, 'update').mockResolvedValue(mockProduct);

      const result = await productController.update('6519', {
        location: MalaysiaRegion.WEST_MALAYSIA,
        price: '100',
        productCode: '6519',
        productDescription: 'SUV',
      });
      expect(result).toEqual(mockProduct);
    });
  });

  describe('delete', () => {
    it('should delete a product successfully', async () => {
      jest
        .spyOn(productRepository, 'delete')
        .mockResolvedValue({ affected: 1, raw: [] });

      const result = await productService.delete('6519');

      expect(jest.spyOn(productRepository, 'delete')).toHaveBeenCalledWith({
        productCode: '6519',
      });

      expect(result).toEqual({ message: 'Product deleted' });
    });

    it('should throw NotFoundException when product not found', async () => {
      jest.spyOn(productRepository, 'delete').mockResolvedValue({
        affected: 0,
        raw: [],
      });

      await expect(productService.delete('NONEXISTENT')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
