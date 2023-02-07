import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
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
}
