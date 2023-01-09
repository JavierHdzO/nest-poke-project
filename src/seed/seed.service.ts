import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';


@Injectable()
export class SeedService {

  constructor(private readonly httpService: HttpService){}
  async execute() {
    const res = await this.httpService.get('https://pokeapi.co/api/v2/pokemon?limit=10', {
      headers:{
        'Content-Encoding': 'gzip',
        'Accept-Encoding':'gzip'
      }
    }).pipe(map( (res) => res.data ));
    return res;
  }

}
