import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { AuthService } from './auth.service';
// import { JwtStrategy } from './strategies/jwt.strategy';
// import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { RefreshJwtAuthGuard } from './guards/refresh-token-auth-guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signInUser')
  async signInUser(@Request() req) {
    return this.authService.signInUser(req.user);
  }

  @Post('signUpUser')
  async signUpUser(@Request() req) {
    return this.authService.signUpUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signOutUser')
  async signOutUser(@Request() req) {
    console.log('request==', req.user);
    return this.authService.signOutUser(req.user);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('session')
  async session(@Request() req) {
    // console.log('request==', req.user);
    return this.authService.refreshToken(req.user);
  }
}
