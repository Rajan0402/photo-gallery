import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HTTP_ONLY_COOKIE } from '../auth.constants';

@Injectable()
export class RefreshJwtAuthGuard extends AuthGuard('refreshJwt') {
  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  handleRequest(err, user, info, context) {
    const request = this.getRequest(context);
    if (!user || err || info) {
      request.res?.cookie('refreshToken', '', HTTP_ONLY_COOKIE);
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
