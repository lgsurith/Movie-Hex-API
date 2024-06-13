import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.moviesService.findAll();
  }

  // @Get(':id')
  // @ApiOkResponse({
  //   description : 'To Find a movie by ID',
  //   type : CreateMovieDto
  // })
  // //to raise errors when the movie is not found
  // @ApiNotFoundResponse({
  //   description : 'Oops! The Movie was not found in the database.'
  // })
  // findOne(@Param('id') id: string) {
  //   return this.moviesService.findOne(+id);
  // }

  //i.e updating the tasks.
  @Patch(':id')
  @ApiBody({
    description : 'To Update a Movie',
    schema : {
      example : {
        movieName : 'The Shawshank Redemption',
        director : 'Frank Darabont',
        releaseDate : '1994-09-14',
        rating : 9.4, 
      }
    }
  })
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
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
