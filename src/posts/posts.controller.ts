import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { PostsService } from './posts.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/caption')
  public async captiononly(
    @Body('caption') caption: string,

    @Req() req,
  ) {
    return this.postService.captiononly(caption, req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/comment/:id')
  public async comment(
    @Param('id') id: number,
    @Body('comment') comment: string,
    @Req() req,
  ) {
    return this.postService.comment(id, comment, req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/video')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/',
        filename: (req, file, callback) => {
          const unique = uuidv4();
          const ext: string = extname(file.originalname);
          const filename = 'videos/' + unique + ext;
          callback(null, filename);
        },
      }),
    }),
  )
  public async video(
    @Req() req,
    @Body('caption') caption: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.postService.postVideo(req, caption, file);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/like/:id')
  public like(@Req() req: any, @Param('id') id: number) {
    return this.postService.like(req, id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/dislike/:id')
  public dislike(@Req() req: any, @Param('id') id: number) {
    return this.postService.dislike(req, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/story')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, callback) => {
          const unique = uuidv4();
          const ext: string = extname(file.originalname);
          const filename = 'story/' + unique + ext;
          callback(null, filename);
        },
      }),
    }),
  )
  public story(@Req() req, @UploadedFile() file: Express.Multer.File) {
    const filename = file.filename;
    const userid = req;
    return this.postService.uploadStories(userid, filename);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/story')
  public deleteStory(@Req() req) {
    return this.postService.deleteStories(req);
  }
}
