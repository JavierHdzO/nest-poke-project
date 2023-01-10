import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NestAxiosAdapter } from 'src/common/adapters/nest-axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';


@Injectable()
export class SeedService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly httpAdapter: NestAxiosAdapter
    ) { }

  async execute() {
    try {
      //'https://pokeapi.co/api/v2/pokemon?limit=100'
      
      const { results } = await this.httpAdapter.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100');
      
      const pokemonToInsert = [];

      results.forEach( ({ name, url  }) => {
        const segments = url.split('/');
        const no = segments[ segments.length - 2 ];

        pokemonToInsert.push({name, no});
      });

      await this.pokemonModel.insertMany( pokemonToInsert );
      
      return 'Seed has been executed successfully';

    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }


  }

}
