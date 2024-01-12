import {IsEmail,IsEnum,IsNotEmpty,IsString,Length,MinLength} from 'class-validator';
import { Role } from 'src/auth/models/role.enum'; 
  
  export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
    @IsNotEmpty()
    @IsEmail({}, {message: 'Please enter correct email'})
    readonly email: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    readonly address: string;

    @IsNotEmpty()
    @IsString()
    @Length(10, 10)
    readonly phoneNumber: string;

    @IsNotEmpty()
    @IsEnum(Role,{message: 'please enter correct role'})
    readonly role :Role;
  }