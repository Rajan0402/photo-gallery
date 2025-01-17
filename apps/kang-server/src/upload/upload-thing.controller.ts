import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadThingService } from './upload-thing.service';

@Controller('upload')
export class UploadThingController {
  constructor(private readonly uploadService: UploadThingService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    console.log('Received files:', files); // Inspect the files
    return this.uploadService.utUploadFile(files);
  }

  @Post('url')
  async uploadFilesFromURL(files: string[]) {
    files = ['https://photos.app.goo.gl/wNYnzeKCDSe4AMoV6'];
    return this.uploadService.utUploadFilesFromURL(files);
  }
}
