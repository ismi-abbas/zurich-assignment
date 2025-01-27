# Zurich Motor Insurance Pricing API

### Core Functionality

- Query insurance premiums based on product code and location
- Administrative management of products and prices
- Role-based access control
- PostgreSQL database integration
- Swagger API documentation
- Docker deployment support
- High performance and scalability

### Technical Implementation

- Built with NestJS framework
- TypeORM for database management
- JWT-based authentication
- Role-based middleware
- DTO validation
- Unit testing with Jest

## Database Schema

### PRODUCT Table

```sql
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    product_code VARCHAR(10) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_code, location)
);
```

## Security

### Authentication

- JWT-based authentication
- Token must include user role information
- Role verification through custom middleware

### Authorization

- Public endpoints: Premium query
- Admin-only endpoints: Product management (POST, PUT, DELETE)

## Project Structure

```
src/
├── modules/
│   └── product/
│       ├── controllers/
│       │   └── product.controller.ts
│       ├── services/
│       │   └── product.service.ts
│       ├── dto/
│       │   ├── create-product.dto.ts
│       │   ├── update-product.dto.ts
│       │   └── query-product.dto.ts
│       ├── entities/
│       │   └── product.entity.ts
│       └── product.module.ts
├── middleware/
│   └── role.middleware.ts
├── guards/
│   └── roles.guard.ts
└── app.module.ts
```

## Performance Optimizations

- Connection pooling for database connections
- Horizontal scaling support through Docker

## Linting and Code Quality

- ESLint configuration for code consistency
- Prettier for code formatting

## API Documentation

- Swagger UI available at `/api-docs`
- Detailed API specifications with request/response examples
- Authentication and authorization documentation

## Error Handling

- Standardized error responses
- Detailed error messages for debugging
- Production-safe error handling

## CI/CD

- Docker image building
- Docker-compose deployment
