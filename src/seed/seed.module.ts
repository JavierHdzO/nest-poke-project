import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { HttpModule } from '@nestjs/axios';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [PokemonModule, HttpModule, CommonModule ],
  controllers: [SeedController],
  providers: [SeedService]
})
export class SeedModule {}
