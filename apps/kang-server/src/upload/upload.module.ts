import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UTApi } from 'uploadthing/server';

export const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});

@Module({
  controllers: [UploadController],
  providers: [UploadService, { provide: UTApi, useValue: utapi }],
})
export class UploadModule {}
