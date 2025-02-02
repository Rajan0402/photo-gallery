import {
  Controller,
  Post,
  UseGuards,
  Body,
  Res,
  Request,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { RefreshJwtAuthGuard } from './guards/refresh-token-auth-guard';
import { Prisma, User } from '@prisma/client';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signInUser')
  signInUser(@Request() req) {
    let refreshToken = req?.signedCookies?.refreshToken;

    // in case testing api through postman, **add headers.origin as mentioned below in postman
    if (!refreshToken && req?.headers?.origin === 'http://fromPostman.com') {
      refreshToken = req?.headers?.authorization.split(' ')[1];
    }
    return this.authService.signInUser(req.user, refreshToken);
  }

  // TODO: update this User type to come from a types folder instead of prisma
  @Post('signUpUser')
  signUpUser(@Body() user: Prisma.UserCreateInput, @Res() res: Response) {
    return this.authService.signUpUser(user, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signOutUser')
  signOutUser(@Request() req) {
    console.log('request==', req.user);
    return this.authService.signOutUser(req.user);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('session')
  session(@Request() req) {
    let refreshToken = req?.signedCookies?.refreshToken;

    // in case testing api through postman, **add headers.origin as mentioned below in postman
    if (!refreshToken && req?.headers?.origin === 'http://fromPostman.com') {
      refreshToken = req?.headers?.authorization.split(' ')[1];
    }
    return this.authService.refreshToken(req.user, refreshToken);
  }
}
