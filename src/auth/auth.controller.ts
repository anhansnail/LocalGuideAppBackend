// src/auth/auth.controller.ts
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

class RegisterDto {
  email: string;
  password: string;
}
class LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  // Ví dụ route cần JWT
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Req() req: any) {
    // req.user được JwtStrategy validate gán vào
    return { userId: req.user.sub, email: req.user.email, role: req.user.role  };
  }
  // logout
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.authService.logout(token);
  }
}
