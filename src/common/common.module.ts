import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { NestAxiosAdapter } from './adapters/nest-axios.adapter';

@Module({
  providers: [NestAxiosAdapter],
  exports:[NestAxiosAdapter],
  imports:[HttpModule]
})
export class CommonModule {}
