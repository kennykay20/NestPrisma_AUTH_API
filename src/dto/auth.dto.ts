import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthDTO {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 30, { message: 'password has to be between 3 and 30 chars' })
  public password: string;
}
