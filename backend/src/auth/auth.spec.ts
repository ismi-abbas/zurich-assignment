import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              if (key === 'JWT_SECRET') {
                return 'secret';
              }
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should sign a token', async () => {
    const token = await service.signToken(1, 'email', 'role');
    expect(token).toBeDefined();
  });

  it('should login successfully', async () => {
    const result = await service.login({
      email: 'admin@zurich.com',
      password: 'password123',
    });
    expect(result).toBeDefined();
  });

  it('should throw an error if login fails', async () => {
    await expect(
      service.login({
        email: 'admin-test@zurich.com',
        password: 'wrongPassword',
      }),
    ).rejects.toThrow();
  });
});
