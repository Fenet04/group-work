
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Adoption } from '../models/adoption.model';

@Injectable()
export class AdoptionService {
  constructor(@InjectModel(Adoption.name) private adoptionModel: Model<Adoption>) {}

  async findAll(): Promise<Adoption[]> {
    return this.adoptionModel.find().exec();
  }
  

  async create(adoption: Adoption): Promise<Adoption> {
    const createdAdoption = new this.adoptionModel(adoption);
    return createdAdoption.save();
  }
}
