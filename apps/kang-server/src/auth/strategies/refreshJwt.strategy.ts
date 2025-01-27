import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refreshJwt',
) {
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
  console.log('request in refresh strategy-----', request);
  let refreshToken = request?.signedCookies?.refreshToken;

  // in case testing api through postman, **add headers.origin as mentioned below in postman
  if (!refreshToken && request?.headers?.origin === 'http://fromPostman.com') {
    refreshToken = request?.headers?.authorization.split(' ')[1];
    return refreshToken;
  }
  return null;
}
