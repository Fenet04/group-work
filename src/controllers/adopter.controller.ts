
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AdopterService } from '../services/adopter.service';
import { Adopter } from '../models/adopter.model';

@Controller('adopters')
export class AdopterController {
  constructor(private readonly adopterService: AdopterService) {}

  @Get()
  findAll(): Promise<Adopter[]> {
    return this.adopterService.findAll();
  }

  @Post()
  create(@Body() adopter: Adopter): Promise<Adopter> {
    return this.adopterService.create(adopter);
  }
}
