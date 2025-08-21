// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'CHANGE_ME_SUPER_SECRET', // 👉 đồng bộ với JwtModule.register
    });
  }

  async validate(payload: any) {
    // Giá trị return sẽ gán vào req.user
    return { sub: payload.sub, email: payload.email };
  }
}
