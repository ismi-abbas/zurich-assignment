import { Product } from 'src/entities/product.entity';
import { setSeederFactory } from 'typeorm-extension';

// Sample seeding
export const ProductFactory = setSeederFactory(Product, (faker) => {
  const product = new Product();
  product.productCode = faker.string.numeric(4);
  product.productDescription = faker.helpers.arrayElement(['SUV', 'Sedan']);
  product.location = faker.helpers.arrayElement([
    'East Malaysia',
    'West Malaysia',
  ]);
  product.price = faker.number.int({ min: 100, max: 1000 }).toString();

  return product;
});
