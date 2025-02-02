import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HTTP_ONLY_REFRESH_TOKEN_COOKIE, saltOrRounds } from './auth.constants';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { DRIZZLE } from '@/drizzle/drizzle.module';
import { DrizzleDB } from '@/drizzle/types/drizzle';
import { eq } from 'drizzle-orm';
import { users } from '@/drizzle/schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(DRIZZLE) private db: DrizzleDB,
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

  async refreshToken(user: any, refreshToken: string) {
    const userExist = await this.db.query.users.findFirst({
      where: eq(users.id, user.userId),
    });

    if (!userExist || !userExist.hashedRefreshToken) {
      throw new UnauthorizedException();
    }

    const isRTvalid = await bcrypt.compare(
      refreshToken,
      userExist.hashedRefreshToken,
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
    // TODO: password must be hashed
    const passwordMatch = user.password === password ? true : false;
    if (passwordMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // async generateUsername(email: string, generateNew: boolean = false) {
  //   const initialUN = email.split('@')[0];
  //   // console.log('initialUN', initialUN);
  //   console.log(initialUN.length);
  //   console.log(initialUN.length <= 7);
  //   console.log(initialUN.length >= 14);
  //   if (initialUN.length <= 7){
  //     // add fillers at the end of string
  //   }

  //   if(initialUN.length > 14){

  //   }

  //   // handle edge cases where length before @ is less than 7, Hint: add randon fillers at the end of string
  //   return initialUN;
  // }

  async checkUsernameExist(username: string) {
    const userWithUsernameExist =
      await this.usersService.findOneByUsername(username);
    if (userWithUsernameExist) return true;
    return false;
  }

  async signUpUser(user: CreateUserDto, res: any) {
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
    }); // adding [0] cause create method return an array of inserted values

    console.log('userCreated', userCreated);

    const refreshToken = await this.jwtService.signAsync(
      {
        // sub: userCreated.id,
      },
      {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_DAYS,
      },
    );

    const hashedRefreshToken = await bcrypt.hash(user.password, saltOrRounds);
    // await this.updateRTHash(userCreated.id, hashedRefreshToken);

    const accessToken = await this.getJWT({
      // sub: userCreated.id,
      // email: userCreated.email,
    });

    res.cookie('refreshToken', refreshToken, HTTP_ONLY_REFRESH_TOKEN_COOKIE);

    return { accessToken };
  }

  async signInUser(user: any, refreshTokenPassed) {
    // TODO: replace email with username
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.getJWT(payload);
    // const refreshToken = await this.getJWT(
    //   { sub: user.id },
    //   process.env.JWT_REFRESH_TOKEN_EXPIRES_DAYS,
    //   process.env.JWT_REFRESH_TOKEN_SECRET,
    // );

    // console.log('RT sent to db in API ----', refreshToken);

    await this.updateRTHash(user.id, refreshTokenPassed);
    return {
      accessToken: accessToken,
    };
  }

  async signOutUser(user: any) {
    return true;
  }
}
