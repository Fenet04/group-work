
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Animal, AnimalSchema } from '../models/animal.model';
import { AnimalController } from '../controllers/animal.controller';
import { AnimalService } from '../services/animal.service';

@Module({
  imports: [ 
    MongooseModule.forRoot('mongodb://localhost/petAdoptionDB'),
    MongooseModule.forFeature([{ name: Animal.name, schema: AnimalSchema }])],
  controllers: [AnimalController],
  providers: [AnimalService],
})
export class AnimalModule {}
