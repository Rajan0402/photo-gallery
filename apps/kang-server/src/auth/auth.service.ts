import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HTTP_ONLY_COOKIE, saltOrRounds } from './auth.constants';
import { CreateUserDto } from '@/users/dto/create-user.dto';

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

  async generateUsername(email: string, generateNew: boolean = false) {
    const initialUN = email.split('@')[0];
    if (initialUN.length >= 7 || initialUN.length <= 14)
      throw new Error('Username must be between 7 and 14 characters.');

    // handle edge cases where length before @ is less than 7, Hint: add randon fillers at the end of string
    return initialUN;
  }

  async checkUsernameExist(username: string) {
    const userWithUsernameExist =
      await this.usersService.findOneByUsername(username);
    if (userWithUsernameExist) return true;
    return false;
  }

  async signUpUser(user: CreateUserDto) {
    // check if same email exist in db
    const userExist = await this.usersService.findOneByEmail(user.email);
    if (userExist.email === user.email)
      throw new Error('Email already exists!');

    if (user.username) {
      const userWithUsernameExist = await this.checkUsernameExist(
        user.username,
      );
      if (userWithUsernameExist) throw new Error('Username already exists!');
    } else {
      // remove everything after @ and make that username
      user.username = await this.generateUsername(user.email); // splitting email by @ and assigning value before @ to username

      // check if that username already exist, if it does generate
      const userWithUsernameExist = await this.checkUsernameExist(
        user.username,
      );
      if (userWithUsernameExist) {
        user.username = await this.generateUsername(user.email, true);
      }
    }

    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);

    const userCreated = await this.usersService.create({
      email: user.email,
      password: hashedPassword,
      username: user.username,
    })[0]; // adding [0] cause create method return an array of inserted values

    const refreshToken = await this.jwtService.signAsync({
      email: user.email,
      sub: userCreated.id,
    });
    const hashedRefreshToken = await bcrypt.hash(user.password, saltOrRounds);

    await this.updateRTHash(userCreated.id, hashedRefreshToken);

    return { message: 'Success' };
  }

  async signInUser(user: any) {
    // TODO: replace email with username
    const payload = { email: user.email, sub: user.id };
    const refreshToken = await this.getJWT(
      payload,
      process.env.JWT_REFRESH_TOKEN_EXPIRES_DAYS,
      process.env.JWT_REFRESH_TOKEN_SECRET,
    );
    await this.updateRTHash(user.id, refreshToken);
    return {
      access_token: 'access_token',
    };
  }

  async signOutUser(user: any) {
    return true;
  }
}
