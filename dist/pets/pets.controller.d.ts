import { PetsService } from './pets.service';
import { Pet } from './schemas/pet.schema';
export declare class PetsController {
    private readonly petsService;
    constructor(petsService: PetsService);
    findAll(): Promise<Pet[]>;
}
