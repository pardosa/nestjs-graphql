import {
  Args,
  Mutation,
  Query,
  Resolver,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Pet } from './pet.entity';
import { PetsService } from './pets.service';
import { CreatePetInput } from './dto/create-pet.input.dto';
import { Owner } from 'src/owners/entities/owner.entity';

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(private petsSetvice: PetsService) {}

  @Query((returns) => [Pet])
  pets(): Promise<Pet[]> {
    return this.petsSetvice.findAll();
  }

  @ResolveField((returns) => Owner)
  owner(@Parent() pet: Pet): Promise<Owner> {
    return this.petsSetvice.getOwner(pet.id);
  }

  @Query((returns) => Pet)
  getPet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petsSetvice.findOne(id);
  }

  @Mutation((returns) => Pet)
  createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    return this.petsSetvice.createPet(createPetInput);
  }
}
