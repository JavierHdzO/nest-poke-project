import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map } from 'rxjs';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonInterface } from 'src/pokemon/interfaces/pokemon.interface';
// import { PokemonService } from 'src/pokemon/pokemon.service'; Option 2
import { PokeResponse } from './interfaces/poke-response.interface';


@Injectable()
export class SeedService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly httpService: HttpService,
    // private readonly pokemonService: PokemonService OPTION 1
    ) { }

  execute() {
    try {
      const result = this.httpService.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100', {
        headers: {
          'Content-Encoding': 'gzip',
          'Accept-Encoding': 'gzip'
        }
      }).pipe(map(async ({ data }) => {
        //option 1
        const pokemonToInsert: PokemonInterface[] = [];

        /* OPTION 2
        const promiseArray = [];
        */
        data.results.forEach(async ({ name, url }) => {
          const fragment = url.split('/');
          const no: number = Number(fragment[fragment.length - 2]);
          // Option 1
          pokemonToInsert.push({ name, no });

          /* OPTION 2
          promiseArray.push(this.pokemonService.create({ name, no }));
          */

        });
        // Option 1
        await this.pokemonModel.insertMany(pokemonToInsert);

        /* OPTION 2
        await Promise.all(promiseArray);
        */
        return 'Seed has been executed successfully';
      }));

      return result;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }


  }

}
