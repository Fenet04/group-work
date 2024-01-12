/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Role } from "../models/role.enum";


@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  address: string;

  @Prop()
  phoneNumber: string;

  @Prop({ default: 'user' })
  role: Role;
  };


export const UserSchema = SchemaFactory.createForClass(User);