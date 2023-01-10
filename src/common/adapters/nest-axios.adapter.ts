import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { httpAdapter } from '../interfaces/adapter.interface';

@Injectable()
export class NestAxiosAdapter implements httpAdapter {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(url: string): Promise<T> {
  
      const { data } = await firstValueFrom(
        this.httpService
          .get<T>(url, {
            headers: {
              'Content-Encoding': 'gzip',
              'Accept-Encoding': 'gzip',
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              console.log(error);
              throw new InternalServerErrorException();
            }),
          ),
      );

      return data;

    
  }
}
