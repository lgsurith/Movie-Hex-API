import { Injectable , NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Repository , QueryBuilder , ILike} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepositry :
    Repository<Movie>){
    }

  async create(createMovieDto: CreateMovieDto) {
    try{
      const movie = this.movieRepositry.create({...createMovieDto })
      return await this.movieRepositry.save(movie)
    }catch(error){
      console.error('Movie cannot be created : ',error)
      throw error
    }
  }

  async findAll() {
    try{
      return await this.movieRepositry.find();
    }catch(error){
      console.error('Movies cannot be found :' , error)
      throw error
    }
  }

  async findOne(id: number) {
    try{
      return await this.movieRepositry.findOne({
        where : { id }
      });
    }catch(error){
      console.error('Movie cannot be found : ',error)
      throw error;
    }
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    try{
      const movie = await this.findOne(id)

      if(!movie){
        throw new NotFoundException();
      }
      Object.assign(movie,updateMovieDto)
      return await this.movieRepositry.save(movie)
    }catch(error){
      console.error('Movie details cannot be updated' , error)
      throw error;
    }
  }

  async remove(id: number) {
    try{
      const movie = await this.findOne(id)
      if(!movie){
        throw new NotFoundException();
      }
      return await this.movieRepositry.remove(movie)
    }catch(error){
      console.error('Movie cannot be removed : ',error)
      throw error;
    }
  }

  //to find the highest rated movie
  async findHighestRatedMovie(){
      return await this.movieRepositry.createQueryBuilder('movie')
      .orderBy('movie.rating','DESC')
      .getMany();
  }

  //to find the movies bnased on their genre.
  async findMoviesByGenre(genre : string){
    return await this.movieRepositry.find({
      where : { genre : genre }
    });
  }

  //to have a query with both genre and rating of the movie.
  async findMoviesByGenreAndRank(genre? : string , rank : boolean = false){
    const query = this.movieRepositry.createQueryBuilder('movie')
    if(genre){
      query.where('movie.genre = :genre',{ genre : genre })
    }
    if(rank){
      query.orderBy('movie.rating','DESC')
    }
    return await query.getMany();
  }
}
