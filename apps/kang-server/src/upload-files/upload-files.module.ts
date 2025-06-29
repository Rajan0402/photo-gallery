import { Module } from '@nestjs/common';
import { UploadFilesController } from './upload-files.controller';
import { UploadFilesService } from './upload-files.service';
import { UploadThingModule } from 'src/upload-thing/upload-thing.module';
import { EncryptionService } from '@/encryption/encryption.service';

@Module({
  imports: [UploadThingModule],
  controllers: [UploadFilesController],
  providers: [UploadFilesService, EncryptionService],
})
export class UploadFilesModule {}
