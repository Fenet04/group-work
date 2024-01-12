
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Adopter, AdopterSchema } from '../models/adopter.model';
import { AdopterController } from '../controllers/adopter.controller';
import { AdopterService } from '../services/adopter.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Adopter.name, schema: AdopterSchema }])],
  controllers: [AdopterController],
  providers: [AdopterService],
})
export class AdopterModule {}
