import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import {
  HTTP_ONLY_COOKIE,
  HTTP_ONLY_REFRESH_TOKEN_COOKIE,
} from '../auth.constants';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private jwtService: JwtService) {
    super();
  }

  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    if (err || !user || info) throw err || new UnauthorizedException();

    const accessToken = this.jwtService.sign({ sub: user.id });
    const refreshToken = this.jwtService.sign({ sub: user.id });

    const request = this.getRequest(context);
    request.res?.cookie('accessToken', accessToken, HTTP_ONLY_COOKIE);
    request.res?.cookie(
      'refreshToken',
      refreshToken,
      HTTP_ONLY_REFRESH_TOKEN_COOKIE,
    );

    return user;
  }
}
