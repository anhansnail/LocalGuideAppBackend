// src/auth/auth.service.ts
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from '../roles/roles.service';
	
// Tạm lưu blacklist trong bộ nhớ (production nên dùng Redis hoặc DB)
const tokenBlacklist = new Set<string>();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private rolesService: RolesService,
  ) {}

  async register(email: string, password: string) {
    const exists = await this.usersService.findByEmail(email);
    if (exists) {
      throw new BadRequestException('Email đã tồn tại');
    }
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return this.usersService.create(email, hash);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Sai email hoặc mật khẩu');
    }
    const ok = await bcrypt.compare(password, (user as any).password);
    if (!ok) {
      throw new UnauthorizedException('Sai email hoặc mật khẩu');
    }
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { sub: user.id, email: user.email , role: user.role?.name || 'customer'};
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
    async logout(token: string) {
    tokenBlacklist.add(token);
    return { message: 'Đăng xuất thành công' };
  }
  isTokenBlacklisted(token: string) {
    return tokenBlacklist.has(token);
  }
}
