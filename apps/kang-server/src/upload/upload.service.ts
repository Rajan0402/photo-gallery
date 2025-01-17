import { Injectable } from '@nestjs/common';
import { UTApi, UTFile } from 'uploadthing/server';
import { UploadFileResult } from 'uploadthing/types';

interface FileEsque extends Blob {
  name: string;
  customId?: string;
}
interface deleteFileRespose {
  success: boolean;
  deletedCount: number;
}

@Injectable()
export class UploadService {
  constructor(private readonly utapi: UTApi) {}

  async uploadFile(files: Express.Multer.File[]): Promise<UploadFileResult[]> {
    const transformedFiles: FileEsque[] = files.map((file) => {
      const blob = new Blob([file.buffer], { type: file.mimetype }); // Create a Blob from the file buffer
      return Object.assign(blob, {
        name: file.originalname,
      });
    });
    console.log('transformedFiles:', transformedFiles);
    const response = await this.utapi.uploadFiles(transformedFiles);
    console.log('files uploaded:', response);
    return response;
  }

  async uploadFilesFromURL(files: string[]): Promise<UploadFileResult[]> {
    const response = await this.utapi.uploadFilesFromUrl(files);
    return response;
  }

  async deleteFiles(files: string[]): Promise<deleteFileRespose> {
    const response = await this.utapi.deleteFiles(files);
    return response;
  }
}
