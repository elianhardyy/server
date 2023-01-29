import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { RolesGuard } from './../roles/roles.guard';
import { LocalAuthGuard } from '../auth/local.auth';
import { LoginValidator } from './login.validator';
import { AuthGuard } from '@nestjs/passport';
import { UsersValidator } from '../validator/user.validator';
import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Users } from './users';
import { UsersService } from './users.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { HttpCode, Next } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { Response } from 'express';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  //register and login
  @Post('/register')
  public registerUser(@Body() users: UsersValidator) {
    console.log('registered');
    return this.userService.register(users);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public login(@Request() req, @Res() res: Response): any {
    return this.userService.login(req.user, res);
  }
  //user authenticated

  @UseGuards(JwtAuthGuard)
  @Post('/verify')
  public verify(@Request() req): any {
    return req.user;
  }

  @UseGuards(RolesGuard, JwtAuthGuard)
  @Roles(Role.User)
  @HttpCode(HttpStatus.OK)
  @Get('/user')
  public user(@Request() req): any {
    return this.userService.dashboard(req);
  }

  @UseGuards(RolesGuard, JwtAuthGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Get('/admin')
  public admin(@Request() req): any {
    return this.userService.dashboard(req);
  }

  @UseGuards(RolesGuard, JwtAuthGuard)
  @Roles(Role.Admin)
  @Get('/find/all/users')
  public async findUser(): Promise<Users[]> {
    return await this.userService.findAll();
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/logout')
  public logout(@Request() req) {
    return this.userService.logout(req);
  }
}
