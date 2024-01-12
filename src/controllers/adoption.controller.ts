
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AdoptionService } from '../services/adoption.service';
import { Adoption } from '../models/adoption.model';

@Controller('adoptions')
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  @Get()
  findAll(): Promise<Adoption[]> {
    return this.adoptionService.findAll();
  }

  @Post()
  create(@Body() adoption: Adoption): Promise<Adoption> {
    return this.adoptionService.create(adoption);
  }
}
