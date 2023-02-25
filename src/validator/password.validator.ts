import { Users } from './../users/users';
import { LoginValidator } from './../users/login.validator';
import { IsNotEmpty, MinLength } from 'class-validator';

export class PasswordValidator extends Users {
  @IsNotEmpty()
  @MinLength(8)
  public password: string;
  @IsNotEmpty()
  @MinLength(8)
  public password_confirm: string;
}
