import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import * as joi from 'joi';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load:[configuration],
      validationSchema: joi.object({
        NODE_ENV: joi.string().valid('dev', 'build', 'test'),
        PORT: joi.number().default(3000),
        URL_MONGODB: joi.string().required()
      })
    }),
    ServeStaticModule.forRoot({
      rootPath: join(  __dirname,'..', 'public')
    }),
    MongooseModule.forRoot(process.env.URL_MONGODB),
    PokemonModule,
    CommonModule,
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
