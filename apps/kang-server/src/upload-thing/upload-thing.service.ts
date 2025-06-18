import { Injectable } from '@nestjs/common';
import { UTApi } from 'uploadthing/server';
import { UploadFileResult } from 'uploadthing/types';
import { createUploadthing, type FileRouter } from 'uploadthing/express';

interface FileEsque extends Blob {
  name: string;
  customId?: string;
}
export interface deleteFileRespose {
  success: boolean;
  deletedCount: number;
}

const f = createUploadthing();

export const fileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 10 } })
    .middleware(async ({ req, input }) => {
      console.log('first');
      return {};
    })
    .onUploadComplete((data) => {
      console.log('Upload complete:', data);
    }),
} satisfies FileRouter;

@Injectable()
export class UploadThingService {
  constructor(private readonly utapi: UTApi) {}

  fileRouter() {
    return fileRouter;
  }

  async utUploadFile(
    files: Express.Multer.File[],
  ): Promise<UploadFileResult[]> {
    console.log('files:--', files);
    const transformedFiles: FileEsque[] = files.map((file) => {
      const blob = new Blob([file.buffer], { type: file.mimetype }); // Create a Blob from the file buffer
      return Object.assign(blob, {
        name: file.originalname,
      });
    });
    // console.log('transformedFiles:', transformedFiles);
    const response = await this.utapi.uploadFiles(transformedFiles);

    // to log in console, the files uploaded
    let resArr = [];
    for (const perFileResponse of response) {
      resArr.push(perFileResponse.data.name);
    }
    console.log('files uploaded:', resArr);
    return response;
  }

  async utUploadFilesFromURL(files: string[]): Promise<UploadFileResult[]> {
    const response = await this.utapi.uploadFilesFromUrl(files);
    return response;
  }

  async utDeleteFiles(files: string[]): Promise<deleteFileRespose> {
    const response = await this.utapi.deleteFiles(files);
    return response;
  }
}
