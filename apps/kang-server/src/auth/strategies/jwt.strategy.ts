import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    console.log('payload--', payload);
    return { userId: payload.sub, email: payload.email };
  }
}

function cookieExtractor(request): string | null {
  let accessToken = request?.signedCookies?.accessToken;

  // in case testing api through postman, **add headers.origin as mentioned below in postman
  if (!accessToken && request?.headers?.origin === 'http://fromPostman.com') {
    accessToken = request?.headers?.authorization.split(' ')[1];
    return accessToken;
  }
  return null;
}
