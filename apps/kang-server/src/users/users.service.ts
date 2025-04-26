import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(
    signUpUserInput: Prisma.UserCreateInput,
    userSelect?: Prisma.UserSelect,
  ) {
    return this.prisma.user.create({
      data: signUpUserInput,
      select: userSelect,
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }

  findOneByUsername(username: string) {
    return this.prisma.user.findFirst({
      where: { username },
    });
  }

  update(userUpdateArgs: Prisma.UserUpdateArgs) {
    return this.prisma.user.update(userUpdateArgs);
  }

  updateRTHash(userId: number, hashedRefreshToken: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { hashed_refresh_token: hashedRefreshToken },
    });
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
