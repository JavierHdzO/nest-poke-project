import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { map } from 'rxjs';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { PokeResponse } from './interfaces/poke-response.interface';


@Injectable()
export class SeedService {

  constructor(
    private readonly httpService: HttpService,
    private readonly pokemonService: PokemonService) { }

  execute() {
    try {
      const result = this.httpService.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100', {
        headers: {
          'Content-Encoding': 'gzip',
          'Accept-Encoding': 'gzip'
        }
      }).pipe(map(async ({ data }) => {

        const promiseArray = [];
        data.results.forEach(async ({ name, url }) => {
          const fragment = url.split('/');
          const no: number = Number(fragment[fragment.length - 2]);

          promiseArray.push(this.pokemonService.create({ name, no }));
        });

        await Promise.all(promiseArray);
        return 'Seed has been executed successfully';
      }));

      return result;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }


  }

}
