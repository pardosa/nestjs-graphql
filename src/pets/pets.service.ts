import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input.dto';
import { OwnersService } from 'src/owners/owners.service';
import { Owner } from 'src/owners/entities/owner.entity';
import { forwardRef } from '@nestjs/common';
import { Inject } from '@nestjs/common';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRepository: Repository<Pet>,
    @Inject(forwardRef(() => OwnersService))
    private ownersService: OwnersService,
  ) {}

  createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput);
    return this.petsRepository.save(newPet);
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find();
  }

  async findOne(id: number): Promise<Pet> {
    return this.petsRepository.findOneByOrFail({ id: id });
  }

  async getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne(ownerId);
  }

  async findByOwner(ownerId: number): Promise<Pet[]> {
    return this.petsRepository.findBy({ ownerId: ownerId });
  }
}
