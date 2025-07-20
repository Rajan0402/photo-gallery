import { Injectable } from '@nestjs/common';
import { UploadThingService } from 'src/upload-thing/upload-thing.service';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { EncryptionService } from '@/encryption/encryption.service';

@Injectable()
export class UploadFilesService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(
    private readonly uploadThingService: UploadThingService,
    private readonly configService: ConfigService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async uploadFiles(files: Express.Multer.File[]) {
    for (const file of files) {
      const { iv, encryptedData } = this.encryptionService.encrypt(file.buffer);

      const encryptedPayload = JSON.stringify({ iv, encryptedData });
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'photo-gallery-store-bucket',
          Key: file.originalname + '.enc.json',
          Body: Buffer.from(encryptedPayload),
          ContentType: 'application/json',
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
