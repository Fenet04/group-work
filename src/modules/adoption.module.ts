
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Adoption, AdoptionSchema } from '../models/adoption.model';
import { AdoptionController } from '../controllers/adoption.controller';
import { AdoptionService } from '../services/adoption.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Adoption.name, schema: AdoptionSchema }])],
  controllers: [AdoptionController],
  providers: [AdoptionService],
})
export class AdoptionModule {}
