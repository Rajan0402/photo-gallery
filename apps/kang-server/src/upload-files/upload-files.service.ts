import { Injectable } from '@nestjs/common';
import { UploadThingService } from 'src/upload-thing/upload-thing.service';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class UploadFilesService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(
    private readonly uploadThingService: UploadThingService,
    private readonly configService: ConfigService,
  ) {}

  async uploadFiles(files: Express.Multer.File[]) {
    for (const file of files) {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'photo-gallery-store-bucket',
          Key: file.originalname,
          Body: file.buffer,
        }),
      );
    }

    return { message: 'success' };
    // return await this.uploadThingService.utUploadFile(files);
  }

  async uploadFilesFromURL(files: string[]) {
    return await this.uploadThingService.utUploadFilesFromURL(files);
  }

  async deleteFiles(files: string[]) {
    return await this.uploadThingService.utDeleteFiles(files);
  }
}
