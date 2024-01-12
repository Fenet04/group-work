
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Animal extends Document {
  @Prop({ required: true })
  ID: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  species: string;

  @Prop({ required: true })
  breed: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true, enum:['female', 'male'] })
  gender: string;

  @Prop({ required: true, enum: ['available', 'pending', 'adopted'] })
  adoptionStatus: string;

  @Prop({ required: true, type: Types.Buffer })
  image: Buffer;
  
}

export type AnimalDocument = Animal & Document;

export const AnimalSchema = SchemaFactory.createForClass(Animal);
