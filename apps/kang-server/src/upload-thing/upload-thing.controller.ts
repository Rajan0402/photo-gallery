//***************************************************************************************************************** */
//******** Removing this file to make this module not available via API and making it only for internal use ********//
//***************************************************************************************************************** */

// import {
//   Controller,
//   Post,
//   UseInterceptors,
//   UploadedFiles,
//   Delete,
// } from '@nestjs/common';
// import { FilesInterceptor } from '@nestjs/platform-express';
// import { UploadThingService } from './upload-thing.service';

// @Controller('ut')
// export class UploadThingController {
//   constructor(private readonly uploadThingService: UploadThingService) {}

//   @Post('uploadFiles')
//   @UseInterceptors(FilesInterceptor('files'))
//   async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
//     console.log('Received files:', files); // Inspect the files
//     return this.uploadThingService.utUploadFile(files);
//   }

//   @Post('uploadFilesFromURL')
//   async uploadFilesFromURL(files: string[]) {
//     return this.uploadThingService.utUploadFilesFromURL(files);
//   }

//   @Delete('deleteFiles')
//   async deleteFiles(files: string[]) {
//     return this.uploadThingService.utDeleteFiles(files);
//   }
// }
