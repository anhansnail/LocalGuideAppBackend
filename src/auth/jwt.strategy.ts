// src/auth/jwt.strategy.ts
import { Injectable , UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'CHANGE_ME_SUPER_SECRET', // 👉 đồng bộ với JwtModule.register
    });
  }

  // async validate(payload: any) {
  //   // Giá trị return sẽ gán vào req.user
  //   return { sub: payload.sub, email: payload.email, role: payload.role  };
  // }
   async validate(payload: any, done: Function) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(payload);
    if (this.authService.isTokenBlacklisted(token)) {
      throw new UnauthorizedException('Token đã bị thu hồi');
    }
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
