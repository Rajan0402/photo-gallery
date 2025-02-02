import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HTTP_ONLY_COOKIE } from '../auth.constants';
import { AuthController } from '../auth.controller';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private authController: AuthController) {
    super();
  }

  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  handleRequest(err, user, info, context) {
    const request = this.getRequest(context);
    if (!user || err || info) {
      request.res?.cookie('accessToken', '', HTTP_ONLY_COOKIE);
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
