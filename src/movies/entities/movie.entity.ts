import { Column , Entity , JoinColumn , JoinTable, ManyToMany , PrimaryColumn , PrimaryGeneratedColumn } from 'typeorm' ;
import { Genre } from 'src/genre/entities/genre.entity';

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id : number ;

    @Column()
    movieName : string ;

    @Column()
    director : string ;

    @Column()
    releaseDate : Date ;

    @Column()
    rating : number ;

    @ManyToMany(() => Genre , genre => genre.movies)
    @JoinTable({
        name : 'movie_genre',
        joinColumn : {name : 'movie_id' , referencedColumnName : 'id'},
        inverseJoinColumn : {name : 'genre_id' , referencedColumnName : 'id'}
    })
    genres : Genre[] ;
}
