import { Users } from '../users/users';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column } from 'typeorm';
//import { IsNotEmpty } from 'class-validator/types/decorator/decorators';

export class UsersValidator extends Users {
  @IsEmail()
  @IsNotEmpty({ message: 'email is required' })
  public email: string;

  @IsNotEmpty({ message: 'password is required' })
  @MinLength(8)
  public password: string;
}
