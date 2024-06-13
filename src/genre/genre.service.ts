import { Injectable , NotFoundException} from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { Movie } from 'src/movies/entities/movie.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepositry :
    Repository<Genre>){
    }

  async create(createGenreDto: CreateGenreDto) {
    try{
      const genre = this.genreRepositry.create(createGenreDto);
      return await this.genreRepositry.save(genre);
    }
    catch(error){
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.genreRepositry.find();
    }
    catch(error){
      console.error(error);
      throw error;
    }
  }

  
  async findOne(id: number) {
    try{
      return await this.genreRepositry.findOne({
        where : { id }
      });
    }
    catch(error){
      console.error(error);
      throw error;
    }
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
   try{
    const genre = await this.findOne(id);
    if(!genre){
      throw new NotFoundException(`Genre with id ${id} not found`);
    }
    this.genreRepositry.merge(genre,updateGenreDto);
    return await this.genreRepositry.save(genre);
   }
   catch(error){
      console.error(error);
      throw error;
   }
  }

  async remove(id: number) {
    try{
      const genre = await this.findOne(id);
      if(!genre){
        throw new NotFoundException(`Genre with id ${id} not found`);
      }
      return await this.genreRepositry.remove(genre);
    }catch(error){
      console.error(error);
      throw error;
    }
  }
  
}
