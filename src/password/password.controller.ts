import { PasswordValidator } from './../validator/password.validator';
import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Controller,
  NotFoundException,
} from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { UsersService } from '../users/users.service';
import { PasswordService } from './password.service';
import * as bcrypt from 'bcrypt';

@Controller('password')
export class PasswordController {
  constructor(
    private passwordService: PasswordService,
    private mailerService: MailerService,
    private userService: UsersService,
  ) {}

  @Post('/forgot')
  public async forgot(@Body('email') email: string) {
    const token = Math.random().toString(20).substring(2, 12);
    await this.passwordService.create({ email, token });

    const url = `http://localhost:3000/reset/${token}`;

    await this.mailerService.sendMail({
      from: email,
      to: 'admin@admin.com',
      subject: 'Reset your password',
      html: `Click <a href="${url}">here</a> to reset your password`,
    });

    return {
      msg: 'Please check your email',
    };
  }
  @Post('/reset')
  public async reset(
    @Body('token') token: string,
    @Body('password') password: PasswordValidator | any,
    @Body('password_confirm') password_confirm: string,
  ) {
    if (password !== password_confirm) {
      throw new BadRequestException('Password do not match');
    }
    const pwreset: any = await this.passwordService.findOne(token);
    const email = pwreset.email;
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const hashedPassword = bcrypt.hashSync(
      password,
      bcrypt.genSaltSync(10, 'b'),
    );
    const update = await this.userService.update(user.email, hashedPassword);
    if (!update) {
      throw new NotFoundException('Gagal');
    } else {
      await this.passwordService.deleteOne(email);
      return {
        msg: 'success',
      };
    }
  }
}
