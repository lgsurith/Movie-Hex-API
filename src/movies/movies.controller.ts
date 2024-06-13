import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiTags , ApiBody , ApiCreatedResponse , ApiOkResponse , ApiNotFoundResponse } from '@nestjs/swagger' ;

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiBody({
    description : 'To Create a New Movie',
    schema : {
      example : {
        movieName : 'The Shawshank Redemption',
        director : 'Frank Darabont',
        releaseDate : '1994-09-14',
        rating : 9.3,
        genre : "Thriller"
      }
    }
  })
  @ApiCreatedResponse({
    description : 'The Movie has been successfully created',
    type : CreateMovieDto
  })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @ApiOkResponse({
    description : 'To Find all the movies in the database',
    type : [CreateMovieDto]
  })
  findAll(@Query('genre') genre? : string , @Query('rank') rank? : string){
    // if(genre){
    //   return this.moviesService.findMoviesByGenre(genre);
    // }
    // else{
    //   return this.moviesService.findAll();
    // }
    const isRanked = rank == 'true';
    return this.moviesService.findMoviesByGenreAndRank(genre,isRanked);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }

  //to add a controller for the services where we used it to rank the movies by their ratings.
  @Get('rank') 
  @ApiOkResponse({
    description : 'To Rank the movies by their ratings',
    type : [CreateMovieDto]
  })
  rankbyRating(){ {
      return this.moviesService.findHighestRatedMovie();
    }
  }

}
