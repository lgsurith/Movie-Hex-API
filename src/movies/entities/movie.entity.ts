import { Column , Decimal128, Entity , JoinColumn , JoinTable, ManyToMany , NumericType, PrimaryColumn , PrimaryGeneratedColumn } from 'typeorm' ;
// import { Genre } from 'src/genre/entities/genre.entity';

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

    @Column('decimal', { precision: 3, scale: 1 })
    rating : number ;

    @Column()
    genre : string ;
}
