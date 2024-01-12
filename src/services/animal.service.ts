
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from '../models/animal.model';
import mongoose from 'mongoose';
import { UpdateAnimalDto } from '../dto/update-animal.dto';

@Injectable()
export class AnimalService {
  constructor(@InjectModel(Animal.name) private animalModel: Model<Animal>) {}

  async findAll(): Promise<Animal[]> {
    return this.animalModel.find().exec();
  }

  async getAnimalById(id: string): Promise<Animal> {
    try {
      const animal = await this.animalModel.findById(id).exec();
      if (!animal) {
        throw new NotFoundException('Animal not found');
      }
      return animal;
    } catch (error) {
      throw new NotFoundException('Animal not found');
    }
  }

  async updateAnimal(id: string, updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
    const existingAnimal = await this.animalModel.findById(id);
  
    if (!existingAnimal) {
      throw new NotFoundException('Animal not found');
    }
  
   
    Object.assign(existingAnimal, updateAnimalDto);
  
 
    if (updateAnimalDto.image) {
      existingAnimal.image = updateAnimalDto.image;
    }
  
    return existingAnimal.save();
  }
  

 
  

  async remove(id: string): Promise<any> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`Invalid ObjectId: ${id}`);
    }
  
    const objectId = new mongoose.Types.ObjectId(id);
    const deletedAnimal = await this.animalModel.findByIdAndDelete(objectId).exec();
  
    if (!deletedAnimal) {
      throw new Error(`Animal not found with id: ${id}`);
    }
  
    return deletedAnimal;
  }
  


  async create(animal: Animal, image: Express.Multer.File): Promise<Animal> {
    
    animal.image=image.buffer;
    const createdAnimal = new this.animalModel(animal);
    return createdAnimal.save();
  }
  async findByIdAndDelete(id: string): Promise<Animal | null> {
    return this.animalModel.findOneAndDelete({ _id: id }).exec();
  }
  
}
