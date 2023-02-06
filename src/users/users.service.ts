import { UsersValidator } from './../validator/user.validator';
import { LoginValidator } from './login.validator';
import { Injectable, Response, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users';
import * as bcrypt from 'bcrypt';
import { NextFunction, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}
  public register(users: Users) {
    const password = bcrypt.hashSync(
      users.password,
      bcrypt.genSaltSync(10, 'b'),
    );
    const newUser = this.usersRepository.create({ ...users, password });
    return this.usersRepository.save(newUser);
  }
  public findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }
  public async findOne(data: any) {
    return this.usersRepository.findOne({ where: { email: data } });
  }
  public async getByName(firstname: string) {
    const userId = await this.usersRepository.findOne({
      where: { firstname: firstname },
    });
    return userId;
  }
  public async update(email: string, password: any): Promise<any> {
    const pwupdate = await this.usersRepository.findOne({ where: { email } });
    pwupdate.password = password;
    return await this.usersRepository.save(pwupdate);
  }
  //LocalAuthGuard
  public async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    const passwordcheck = await bcrypt.compare(password, user.password);
    if (user && passwordcheck) {
      const { password, ...result } = user;
      user.is_active = true;
      this.usersRepository.save(user);
      return result;
    }
    return null;
  }

  //JwtAuthGuard
  public async login(user: UsersValidator, res: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      firstname: user.firstname,
    };
    const token = this.jwtService.sign(payload);
    res.cookie('jwt', token, { httpOnly: true });
    return res.json({ jwt: token });
  }
  public async logout(req: any) {
    const user = await this.usersRepository.findOne({
      where: { email: req.user.email },
    });
    user.is_active = false;
    this.usersRepository.save(user);
    req.session.destroy((err: Error) => {
      if (err) {
        return err.message;
      } else {
        return { msg: 'logged out' };
      }
    });
  }
  public async dashboard(req: any) {
    // const cookie = req.cookies['jwt'];
    // console.log(cookie);
    // const data: any = this.jwtService.decode(cookie);
    const user = await this.usersRepository.findOne({
      where: { email: req.user.email },
      relations: { profile: true },
    });
    return user;
  }
}
