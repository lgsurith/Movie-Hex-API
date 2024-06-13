import { Controller, Get, Post, Body, Patch, Param, Delete,NotFoundException} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiTags , ApiBody , ApiCreatedResponse , ApiOkResponse , ApiNotFoundResponse } from '@nestjs/swagger';
import { Genre } from './entities/genre.entity';

@ApiTags('genre')
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @ApiBody({
    description : 'To Create a New Genre',
    schema : {
      example : {
        genre : 'Action',
      }
    }
  })
  @ApiCreatedResponse({
    description : 'The Genre has been successfully created',
    type : Genre,
  })
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @Get()
  @ApiOkResponse({
    description : 'To Find all the genres in the database',
    type : [Genre]
  })
  findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description : 'To Find a genre by ID',
    type : Genre
  })
  @ApiNotFoundResponse({
    description : 'Oops! The Genre was not found in the database.'
  })
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({
    description : 'To Update a Genre',
    schema : {
      example : {
        genre : 'Thriller',
      }
    }
  })
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(+id, updateGenreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
}