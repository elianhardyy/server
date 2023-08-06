import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Body,
  Controller,
  Delete,
  Get,
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
import { Posts } from './posts';
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get('all/posts')
  public async getAllPosts() {
    return this.postService.getPostImage();
  }

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
    @Req() req: any,
  ): Promise<any> {
    return this.postService.comment(id, comment, req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/',
        filename: (req, file, callback) => {
          const unique = uuidv4();
          const ext: string = extname(file.originalname);
          const filename = 'images/' + unique + ext;
          callback(null, filename);
        },
      }),
    }),
  )
  public async video(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body('caption') caption: string,
  ) {
    return this.postService.postImage(req, caption, file.filename);
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

  @UseGuards(JwtAuthGuard)
  @Get('/comments/get/:id')
  public async allComments(@Param('id') id: number) {
    return this.postService.allCommentsByPost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/like/:id')
  public async deleteSingleLike(@Param('id') id: number, @Req() req) {
    return this.postService.deleteLike(id, req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get/like/:id')
  public async getLikeBySinglePost(@Param('id') id: number) {
    return this.postService.allLikes(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/post/:id')
  public async deleteSinglePostId(@Param('id') id: number) {
    return this.postService.deletePost(id);
  }
}
