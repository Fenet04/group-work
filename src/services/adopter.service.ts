
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Adopter } from '../models/adopter.model';

@Injectable()
export class AdopterService {
  constructor(@InjectModel(Adopter.name) private adopterModel: Model<Adopter>) {}

  async findAll(): Promise<Adopter[]> {
    return this.adopterModel.find().exec();
  }

  async create(adopter: Adopter): Promise<Adopter> {
    const createdAdopter = new this.adopterModel(adopter);
    return createdAdopter.save();
  }
}
