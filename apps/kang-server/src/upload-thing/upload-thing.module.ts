import 'dotenv/config';
import { Module } from '@nestjs/common';
// import { UploadThingController } from './upload-thing.controller';
import { UploadThingService } from './upload-thing.service';
import { UTApi } from 'uploadthing/server';
import { ConfigService } from '@nestjs/config';
import { UploadThingHandlerController } from './upload-thing.controller';

@Module({
  controllers: [UploadThingHandlerController], //controller removed
  providers: [
    UploadThingService,
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
  exports: [UploadThingService],
})
export class UploadThingModule {}
