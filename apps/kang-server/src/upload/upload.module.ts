import 'dotenv/config';
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UTApi } from 'uploadthing/server';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [UploadController],
  providers: [
    UploadService,
    {
      provide: UTApi,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const token = configService.get<string>('UPLOADTHING_TOKEN');
        const utapi = new UTApi({
          token: token,
        });
        return utapi;
      },
    },
  ],
})
export class UploadModule {}
