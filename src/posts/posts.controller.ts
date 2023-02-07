import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostsService } from './posts.service';

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
}
