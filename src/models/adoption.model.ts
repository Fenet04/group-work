// src/models/adoption.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Adoption extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Animal', required: true })
  animalID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Adopter', required: true })
  adopterID: Types.ObjectId;

  @Prop({ required: true })
  adoptionDate: Date;

}

export const AdoptionSchema = SchemaFactory.createForClass(Adoption);
