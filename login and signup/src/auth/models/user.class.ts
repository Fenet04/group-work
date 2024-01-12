import { IsEmail, IsString } from 'class-validator';
import { Role } from './role.enum';

export class User {
  // id: number;
  name:string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  address: string;
  roles: string[];
  
}