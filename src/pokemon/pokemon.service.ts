import { Model, Types } from 'mongoose';
import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon, PokemonDocument} from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) 
    private pokemonModel: Model<PokemonDocument> ){}

  async create(createPokemonDto: CreatePokemonDto):Promise<Pokemon> {
    try{
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;
    } catch (error){
      
      if(error.code === 11000){
        throw new BadRequestException(`Pokemon exist, ${ JSON.stringify( error.keyValue ) }`);
      }
      console.log(error);
      throw new InternalServerErrorException();
    } 
  }

  async findAll(): Promise<Pokemon[]> {
    const pokemons: Pokemon[] =  await this.pokemonModel.find();
    return pokemons;
  }

  async findOne(id: string): Promise<Pokemon> {
    let pokemon: Pokemon;
    try {
      if( !isNaN(Number(id)) ){
        pokemon = await this.pokemonModel.findOne({ no: id });

      }else if(Types.ObjectId.isValid(id)){
        pokemon = await this.pokemonModel.findById(id);

      }else{
        pokemon = await this.pokemonModel.findOne({name: id});
      }
  
      if(!pokemon) throw new NotFoundException();
      
      return pokemon;

    } catch (error) {
      if(error.response.message === 'Not Found'){
        throw new NotFoundException();
      }
      console.log(error);
      throw new InternalServerErrorException();
    }
    
  }

  update(id: string, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: string) {
    return `This action removes a #${id} pokemon`;
  }
}
