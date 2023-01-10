import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity'
import { Model } from 'mongoose';

@Module({
  imports:[ MongooseModule.forFeature([{name: Pokemon.name, schema: PokemonSchema}]) ],
  controllers: [PokemonController],
  providers: [PokemonService],
  exports:[ PokemonService, MongooseModule ]
})
export class PokemonModule {}
