import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, map } from 'rxjs';
import { httpAdapter } from '../interfaces/adapter.interface';

@Injectable()
export class NestAxiosAdapter implements httpAdapter{

    constructor(
        private readonly httpService: HttpService
    ){}

    get<T>( url: string): Observable<T>{
        
        try {
            const result = this.httpService.get<T>( url , {
                headers: {
                    'Content-Encoding': 'gzip',
                    'Accept-Encoding': 'gzip'
                }
            }).pipe( map(({data}) => {
                
                return data;
            }));
    
            return result;
        } catch (error) {
            console.log(error);

            throw new InternalServerErrorException('Report the problem to the admin');
        }
    }
}
