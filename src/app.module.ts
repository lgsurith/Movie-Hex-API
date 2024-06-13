import { Inject , Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule , ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { MoviesModule } from './movies/movies.module';
import { config } from 'process';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory : (configService : ConfigService) => ({
        type : 'postgres',
        host : configService.get('DB_HOST'),
        port : +configService.get('DB_PORT'),
        username : configService.get('DB_USERNAME'),
        password : configService.get('DB_PASSWORD'),
        database : configService.get('DB_NAME'),
        entities : [join(process.cwd() , 'dist/**/*.entity.js')],
        synchronize : true,
      }),
    }),
    MoviesModule,
    GenreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
