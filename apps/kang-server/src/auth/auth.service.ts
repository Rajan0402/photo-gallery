import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HTTP_ONLY_REFRESH_TOKEN_COOKIE, saltOrRounds } from './auth.constants';
import { PrismaService } from '@/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async getJWT(payload, expiresIn = null, secret = null) {
    const token = await this.jwtService.signAsync(payload, {
      ...(secret && { secret }),
      ...(expiresIn && { expiresIn }),
    });

    return token;
  }

  async updateRTHash(userId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, saltOrRounds);

    const updateRtHashInDB = {
      where: { id: userId },
      data: { hashed_refresh_token: hashedRefreshToken },
    };

    await this.usersService.update(updateRtHashInDB);
  }

  async refreshToken(user: any, refreshToken: string) {
    const userExist = await this.prisma.user.findFirst({
      where: {
        id: user.userId,
      },
    });

    if (!userExist || !userExist.hashed_refresh_token) {
      throw new UnauthorizedException();
    }

    const isRTvalid = await bcrypt.compare(
      refreshToken,
      userExist.hashed_refresh_token,
    );

    if (!isRTvalid) throw new ForbiddenException('Access Denied');

    const token = await this.getJWT({
      sub: userExist.id,
      email: userExist.email,
    });

    return { accessToken: token };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) return null;

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async checkUsernameExist(username: string) {
    const userWithUsernameExist =
      await this.usersService.findOneByUsername(username);
    if (userWithUsernameExist) return true;
    return false;
  }

  async signUpUser(user: Prisma.UserCreateInput, res: any) {
    // check if same email exist in db
    const userExist = await this.usersService.findOneByEmail(user.email);
    if (userExist) throw new Error('Email already exists!');

    const userWithUsernameExist = await this.checkUsernameExist(user.username);
    if (userWithUsernameExist) throw new Error('Username already exists!');

    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);

    const userCreated = await this.usersService.create({
      email: user.email,
      password: hashedPassword,
      username: user.username,
    });

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: userCreated.id,
      },
      {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_DAYS,
      },
    );

    const hashedRefreshToken = await bcrypt.hash(user.password, saltOrRounds);
    await this.updateRTHash(userCreated.id, hashedRefreshToken);

    const accessToken = await this.getJWT({
      sub: userCreated.id,
      email: user.email,
    });
    res.cookie('refreshToken', refreshToken, HTTP_ONLY_REFRESH_TOKEN_COOKIE);
    return res.json({ accessToken: accessToken });

    // return { accessToken: accessToken };
  }

  async signInUser(user: any, refreshToken) {
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.getJWT(payload);
    // const refreshToken = await this.getJWT(
    //   { sub: user.id },
    //   process.env.JWT_REFRESH_TOKEN_EXPIRES_DAYS,
    //   process.env.JWT_REFRESH_TOKEN_SECRET,
    // );

    // console.log('RT sent to db in API ----', refreshToken);

    await this.updateRTHash(user.id, refreshToken);
    return {
      accessToken,
    };
  }

  async signOutUser(user: any) {
    return true;
  }
}
