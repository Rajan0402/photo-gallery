import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { UploadThingModule } from '../upload/upload-thing.module';
import { UploadFilesModule } from '../upload-files/upload-files.module';

@Module({
  imports: [DrizzleModule, UploadThingModule, UploadFilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
