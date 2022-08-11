import { Field, Float, Int, ObjectType, Root } from 'type-graphql';

import { Column } from 'typeorm';

import Genre from './genre.interface';

import Company from './company.interface';

import Language from './language.interface';

@ObjectType()
export default class Movie {
  @Field()
  @Column()
  readonly id: string;

  @Field()
  @Column({ name: 'imdb_id' })
  readonly imdbId: string;

  @Field()
  @Column({ name: 'original_language' })
  readonly originalLanguage: string;

  @Field()
  @Column({ name: 'original_title' })
  readonly originalTitle: string;

  @Field()
  @Column()
  readonly overview: string;

  @Field(() => Int)
  @Column()
  readonly runtime: number;

  @Field(() => Float)
  @Column({ name: 'vote_average' })
  readonly voteAverage: number;

  @Field()
  @Column({ name: 'poster_path' })
  readonly posterPath: string;

  @Field()
  @Column({ name: 'backdrop_path' })
  readonly backdropPath: string;

  @Field(() => Date)
  @Column({ name: 'release_date' })
  readonly releaseDate: Date;

  @Field(() => [Genre])
  @Column()
  readonly genres: Genre[];

  @Field(() => [Company])
  @Column({ name: 'production_companies' })
  readonly productionCompanies: Company[];

  @Field(() => [Language])
  @Column({ name: 'spoken_languages' })
  readonly spokenLanguages: Language[];

  @Field()
  posterUrl(@Root('poster_path') posterPath: string): string {
    if (!posterPath) return '';

    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  @Field()
  backdropUrl(@Root('backdrop_path') backdropPath: string): string {
    if (!backdropPath) return '';

    return `https://image.tmdb.org/t/p/w500${backdropPath}`;
  }
}
