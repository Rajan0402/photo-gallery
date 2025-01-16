import { Injectable } from '@nestjs/common';
import { UTApi, UTFile } from 'uploadthing/server';
import { UploadFileResult } from 'uploadthing/types';

@Injectable()
export class UploadService {
  constructor(private readonly utapi: UTApi) {}
  async uploadFile(files: UTFile[]): Promise<UploadFileResult[]> {
    const response = await this.utapi.uploadFiles(files);
    return response;
  }
}
