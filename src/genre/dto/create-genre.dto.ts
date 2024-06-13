import { Movie } from "src/movies/entities/movie.entity";

export class CreateGenreDto {
    genre : string ;
    movies : Movie[] ;
}
