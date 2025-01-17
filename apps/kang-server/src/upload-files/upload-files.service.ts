import { Injectable } from '@nestjs/common';
import { UploadThingService } from 'src/upload-thing/upload-thing.service';

@Injectable()
export class UploadFilesService {
  constructor(private readonly uploadThingService: UploadThingService) {}

  async uploadFiles(files: Express.Multer.File[]) {
    return await this.uploadThingService.utUploadFile(files);
  }

  async uploadFilesFromURL(files: string[]) {
    return await this.uploadThingService.utUploadFilesFromURL(files);
  }

  async deleteFiles(files: string[]) {
    return await this.uploadThingService.utDeleteFiles(files);
  }
}
