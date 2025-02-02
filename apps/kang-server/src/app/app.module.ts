import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadThingModule } from '../upload-thing/upload-thing.module';
import { UploadFilesModule } from '../upload-files/upload-files.module';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UploadThingModule,
    UploadFilesModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
