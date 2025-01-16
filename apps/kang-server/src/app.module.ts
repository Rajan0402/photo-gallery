import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [DrizzleModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
