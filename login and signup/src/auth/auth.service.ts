/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { Role } from './models/role.enum';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string ; Role: string}> {
    const { name, email, password,address,phoneNumber,role } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      role
    });

    const token = this.jwtService.sign({ id: user._id });
    const Role =user.role;
    return { token ,Role};
  }

  async login(loginDto: LoginDto): Promise<{ token: string ,Role: string}> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email ');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    const roleGet =user.role

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid  password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token,Role:roleGet};
  }
}