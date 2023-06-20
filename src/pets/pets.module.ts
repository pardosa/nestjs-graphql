import { Module, forwardRef } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsResolver } from './pets.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { OwnersModule } from 'src/owners/owners.module';
import { Owner } from 'src/owners/entities/owner.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pet, Owner]),
    forwardRef(() => OwnersModule),
  ],
  providers: [PetsService, PetsResolver],
  exports: [PetsService],
})
export class PetsModule {}
