import { FileInterceptor } from '@nestjs/platform-express';
import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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
  public async video() {}
}
