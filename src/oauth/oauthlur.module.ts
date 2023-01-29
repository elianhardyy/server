import { Module } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy';
import { OauthController } from './oauth.controller';
import { OauthlurService } from './oauthlur.service';

@Module({
  controllers: [OauthController],
  providers: [OauthlurService, GoogleStrategy],
})
export class OauthlurModule {}
