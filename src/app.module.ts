import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express'; 
import { AnimalModule } from './modules/animal.module';


import { Animal, AnimalSchema } from './models/animal.model';
import { AnimalService } from './services/animal.service';
import { AnimalController } from './controllers/animal.controller';

import { memoryStorage } from 'multer';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/petAdoptionDB', ),
    MulterModule.register({
      storage: memoryStorage(),
    }),
    AnimalModule,
    
    MongooseModule.forFeature([{ name: Animal.name, schema: AnimalSchema }]),
  ],
  controllers: [AnimalController],
  providers: [AnimalService],
})
export class AppModule {}

