
import { Controller, Get, Post, Delete, Put, Param, Body, UseInterceptors, UploadedFile, NotFoundException} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AnimalService } from '../services/animal.service';
import { Animal } from '../models/animal.model';
import { Express } from 'express';
import { UpdateAnimalDto } from '../dto/update-animal.dto';


@Controller('animals')
export class AnimalController {
  constructor( private readonly animalService: AnimalService) {}

  @Get()
  async findAll(): Promise<Animal[]> {
    return this.animalService.findAll();
  }

  @Get(':id')
  async getAnimalById(@Param('id') id: string) {
    try {
      const animal = await this.animalService.getAnimalById(id);
      return { ID: animal._id.toString(), ...animal.toJSON() };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Animal not found');
      }
      throw new NotFoundException('Animal not found');
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@UploadedFile() image: Express.Multer.File, @Body() animal: Animal): Promise<Animal> {
    
    console.log("Image Object:", image);
    return this.animalService.create(animal, image);
  }


  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
    return this.animalService.updateAnimal(id, updateAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.animalService.remove(id);
  }

}


