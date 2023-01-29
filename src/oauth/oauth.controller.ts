import { OauthlurService } from './oauthlur.service';
import { Controller, Get, UseGuards, Req } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
@Controller('oauth2')
export class OauthController {
  constructor(private readonly oauthService: OauthlurService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  public async googleAuth(@Req() req) {}

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  public async googleAuthRedirect(@Req() req) {
    return this.oauthService.googleLogin(req);
  }
}
