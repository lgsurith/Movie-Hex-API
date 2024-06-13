import {Column , Entity , PrimaryGeneratedColumn , ManyToMany , JoinTable} from 'typeorm' ;
import { Movie } from 'src/movies/entities/movie.entity';

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id : number ;

    @Column()
    genre : string ;

    @ManyToMany(() => Movie , movie => movie.genres)
    movies : Movie[] ;
}

