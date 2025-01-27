import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HTTP_ONLY_COOKIE, saltOrRounds } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getJWT(payload, expiresIn = null, secret = null) {
    const token = await this.jwtService.signAsync(payload, {
      ...(secret && { secret }),
      ...(expiresIn && { expiresIn }),
    });

    return token;
  }

  async updateRTHash(userId, refreshToken) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, saltOrRounds);

    await this.usersService.updateRTHash(userId, hashedRefreshToken);
  }

  async refreshToken(user: any) {
    throw new Error('refreshToken Method not implemented.');
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) return null;
    // TODO: password must be hashed
    const passwordMatch = user.password === password ? true : false;
    if (passwordMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signUpUser(user: any) {
    // check if same email exist in db
    // remove everything after @ and make that username
    //
  }

  async signInUser(user: any) {
    // TODO: replace email with username
    const payload = { email: user.email, sub: user.id };
    const refreshToken = await this.getJWT(
      payload,
      process.env.JWT_REFRESH_TOKEN_EXPIRES_DAYS,
      process.env.JWT_REFRESH_TOKEN_SECRET,
    );
    return {
      access_token: 'access_token',
    };
  }

  async signOutUser(user: any) {
    return true;
  }
}
