import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { users } from 'src/drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  create(createUserDto: CreateUserDto) {
    return this.db
      .insert(users)
      .values({
        email: createUserDto.email,
        password: createUserDto.password,
        username: createUserDto.username,
        hashedRefreshToken: createUserDto?.hashedRefreshToken,
      })
      .returning();
  }

  findAll() {
    // return await this.db.select().from(users);
    return this.db.query.users.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findOneByEmail(email: string) {
    return this.db.query.users.findFirst({ where: eq(users.email, email) });
  }

  findOneByUsername(username: string) {
    return this.db.query.users.findFirst({
      where: eq(users.username, username),
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  updateRTHash(userId: number, hashedRefreshToken: string) {
    return this.db
      .update(users)
      .set({ hashedRefreshToken: hashedRefreshToken })
      .where(eq(users.id, userId));
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
