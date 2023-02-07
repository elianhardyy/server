import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FollowService } from './follows.service';

@Controller('relation')
export class FollowController {
  constructor(private followService: FollowService) {}
  @UseGuards(JwtAuthGuard)
  @Post('/follow/:id')
  public follow(@Req() req: any, @Param('id') id: number) {
    return this.followService.follow(req, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/unfollow/:id')
  public unfollow(@Req() req: any, @Param('id') id: number) {
    return this.followService.unfollow(req, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('follower')
  public async follower(@Req() req: any) {
    return this.followService.follower(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('following')
  public async following(@Req() req: any) {
    return this.followService.following(req);
  }
}
