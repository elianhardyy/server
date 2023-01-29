import { LoginValidator } from '../users/login.validator';
import { UsersService } from '../users/users.service';
import { IStrategyOptionsWithRequest, Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: UsersService) {
    super({ usernameField: 'email' });
  }
  public async validate(email: string, password: string): Promise<any> {
    const user = await this.auth.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('User is unauthorized');
    }
    return user;
  }
}
