import { Module, forwardRef } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersResolver } from './owners.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { PetsModule } from 'src/pets/pets.module';
import { Pet } from 'src/pets/pet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Owner, Pet]),
    forwardRef(() => PetsModule),
  ],
  providers: [OwnersResolver, OwnersService],
  exports: [OwnersService],
})
export class OwnersModule {}
