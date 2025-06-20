import {
  All,
  Controller,
  Req,
  Res,
  Next,
  Inject,
  UseInterceptors,
  UploadedFile,
  Post,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createRouteHandler } from 'uploadthing/express';
import { UploadThingService } from './upload-thing.service';
import { UTApi } from 'uploadthing/server';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('uploadthing')
export class UploadThingHandlerController {
  private handler: ReturnType<typeof createRouteHandler>;

  constructor(
    @Inject(UTApi) private readonly utapi: UTApi,
    private readonly uploadThingService: UploadThingService,
  ) {
    this.handler = createRouteHandler({
      router: this.uploadThingService.fileRouter(),
    });
  }

  @Post('*')
  @UseInterceptors(FilesInterceptor('files'))
  handle(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
    @UploadedFile() files: Express.Multer.File[],
  ) {
    // console.log(req.files);
    // req.body = { files: req.files };
    return this.handler;
  }
}
