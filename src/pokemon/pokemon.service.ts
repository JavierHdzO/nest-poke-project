import { Model, Query, Types } from 'mongoose';
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
      const pokemon = new this.pokemonModel( createPokemonDto );
      await pokemon.save();
      return pokemon;
    } catch (error){
      
      this.handleExceptions(error);
    } 
  }

  async findAll(): Promise<Pokemon[]> {
    try {
      const pokemons: Pokemon[] =  await this.pokemonModel.find();
      return pokemons;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(id: string) {
    let pokemon;

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
    } 
    catch (error) {
      this.handleExceptions(error);
    }
    
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto): Promise<Pokemon> {
    try {
      const pokemon =  await this.findOne( id );

      await pokemon.updateOne( updatePokemonDto, { new: true } );
    
      return { ...pokemon.toJSON(), ...updatePokemonDto };
  
    } catch (error) {
      this.handleExceptions(error);
    }

  }

  async remove(id: string) {
    
    try {
      const pokemon = await this.pokemonModel.findByIdAndDelete( id );

      if(!pokemon) throw new BadRequestException();

      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }

  }


  private handleExceptions( error: any ){
    console.log(error);
    if(error.status === 400) throw new BadRequestException('Pokemon with id was not found');
    if( error.code === 11000 ) throw new BadRequestException();
    
    throw new InternalServerErrorException();
  }
}
