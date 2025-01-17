import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Delete,
  Body,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadFilesService } from './upload-files.service';

@Controller('files')
export class UploadFilesController {
  constructor(private readonly uploadFilesService: UploadFilesService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    return await this.uploadFilesService.uploadFiles(files);
  }

  @Post('uploadFilesFromURL')
  async uploadFilesFromURL(@Body('files') files: string[]) {
    return this.uploadFilesService.uploadFilesFromURL(files);
  }

  @Delete('deleteFiles')
  async deleteFiles(@Body('files') files: string[]) {
    return this.uploadFilesService.deleteFiles(files);
  }
}
