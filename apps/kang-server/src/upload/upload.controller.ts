import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    console.log('Received files:', files); // Inspect the files
    return this.uploadService.uploadFile(files);
  }

  @Post('url')
  async uploadFilesFromURL(files: string[]) {
    files = ['https://photos.app.goo.gl/wNYnzeKCDSe4AMoV6'];
    return this.uploadService.uploadFilesFromURL(files);
  }
}
