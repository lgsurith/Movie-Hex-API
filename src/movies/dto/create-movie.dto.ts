import { Genre } from "src/genre/entities/genre.entity";

export class CreateMovieDto {
    movieName : string ;
    director : string ;
    releaseDate : Date ;
    rating : number ;
    genres : Genre[] ;
}
