import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.rolePermission.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.role.deleteMany();
  await prisma.user.deleteMany();

  // Create permissions
  const permissions = await Promise.all([
    prisma.permission.create({
      data: {
        name: 'CREATE_PRODUCT',
        description: 'Can create new products',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'READ_PRODUCT',
        description: 'Can view products',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'UPDATE_PRODUCT',
        description: 'Can update products',
      },
    }),
    prisma.permission.create({
      data: {
        name: 'DELETE_PRODUCT',
        description: 'Can delete products',
      },
    }),
  ]);

  // Create roles
  const adminRole = await prisma.role.create({
    data: {
      name: 'ADMIN',
      description: 'Administrator with full access',
    },
  });

  const userRole = await prisma.role.create({
    data: {
      name: 'USER',
      description: 'Regular user with limited access',
    },
  });

  // Assign all permissions to admin role
  await Promise.all(
    permissions.map((permission) =>
      prisma.rolePermission.create({
        data: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      }),
    ),
  );

  // Assign only READ permission to user role
  await prisma.rolePermission.create({
    data: {
      roleId: userRole.id,
      permissionId: permissions.find((p) => p.name === 'READ_PRODUCT')!.id,
    },
  });

  // Create default admin user
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
    },
  });

  // Create default regular user
  const regularUser = await prisma.user.create({
    data: {
      name: 'Regular User',
      email: 'user@example.com',
      password: await bcrypt.hash('user123', 10),
    },
  });

  // Assign roles to users
  await prisma.userRole.create({
    data: {
      userId: adminUser.id,
      roleId: adminRole.id,
    },
  });

  await prisma.userRole.create({
    data: {
      userId: regularUser.id,
      roleId: userRole.id,
    },
  });

  const productData = [
    {
      productCode: '1000',
      productDescription: 'Sedan',
      location: 'West Malaysia',
      price: '300',
    },
    {
      productCode: '2000',
      productDescription: 'Sedan',
      location: 'East Malaysia',
      price: '450',
    },
    {
      productCode: '3000',
      productDescription: 'SUV',
      location: 'West Malaysia',
      price: '500',
    },
    {
      productCode: '4000',
      productDescription: 'SUV',
      location: 'East Malaysia',
      price: '650',
    },
  ];

  await prisma.product.createMany({
    data: productData,
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
