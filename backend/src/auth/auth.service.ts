import {
  HttpCode,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  public users = [
    {
      id: 1,
      role: 'admin',
      email: 'admin@zurich.com',
    },
    {
      id: 2,
      role: 'user',
      email: 'user@zurich.com',
    },
  ];

  constructor(
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  async login(data: SignInDto) {
    const user = this.users.find((u) => u.email === data.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      token: await this.signToken(user.id, user.email, user.role),
      message: 'Login successful',
    };
  }

  async signToken(
    userId: number,
    email: string,
    role: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      role,
    };

    const secret = this.config.get('JWT_SECRET') as string;

    const token = await this.jwt.signAsync(payload, {
      secret: secret,
      expiresIn: '1h',
    });

    return {
      access_token: token,
    };
  }
}
