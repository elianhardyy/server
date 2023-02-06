import { ConfigService } from '@nestjs/config/dist';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { AuthenticatedGuard } from './../auth/authenticated.guard';
import {
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common/decorators';
import { ProfilesService } from './profiles.service';
import { Profile } from './profile';
import { Controller, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import * as process from 'process';
@Controller('profiles')
export class ProfilesController {
  constructor(
    private readonly profileService: ProfilesService, //public envi: ConfigService,
  ) {}
  //public env = this.envi;
  @UseGuards(JwtAuthGuard)
  @Post('/photo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/profile',
        filename: (req, file, callback) => {
          const unique = uuidv4();
          const ext: string = extname(file.originalname);
          const filename = unique + ext;
          callback(null, filename);
        },
      }),
    }),
  )
  public async photo(@Req() req, @UploadedFile() file: Express.Multer.File) {
    const filename = file.filename;
    const userid = req.user.id;
    return this.profileService.add(userid, filename);
  }
}
