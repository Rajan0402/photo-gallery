import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Delete,
  Body,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadFilesService } from './files.service';

@Controller('files')
export class UploadFilesController {
  constructor(private readonly uploadFilesService: UploadFilesService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({maxSize: 5000}),
        ],
      }),
    )
    files: Express.Multer.File[],
  ) {
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
