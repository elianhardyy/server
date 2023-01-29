import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginValidator {
  @IsEmail()
  public email: string;
  @IsNotEmpty()
  public password: string;
}
