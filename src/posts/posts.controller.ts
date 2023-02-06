import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/caption')
  public async captiononly(
    @Body('caption') caption: string,
    @Body('comment') comment: string,
    @Body('username') username: string,
    @Req() req,
  ) {
    return this.postService.captiononly(caption, comment, username, req);
  }
}
