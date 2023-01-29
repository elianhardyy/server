import { LoginValidator } from './../users/login.validator';
import { IsNotEmpty, MinLength } from 'class-validator';

export class PasswordValidator {
  @IsNotEmpty()
  @MinLength(8)
  public password: string;
}
