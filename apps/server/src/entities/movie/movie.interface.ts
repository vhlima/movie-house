import {
  Field,
  FieldResolver,
  Float,
  Int,
  ObjectType,
  Root,
} from 'type-graphql';

import { prop } from '@typegoose/typegoose';

import MovieGenre from './genre/genre.interface';
import MovieCompany from './company/company.interface';
import MovieLanguage from './language/language.interface';

/* eslint-disable camelcase */

@ObjectType()
export default class Movie {
  @Field()
  @prop()
  readonly id: string;

  @Field()
  @prop()
  readonly imdb_id: string;

  @Field()
  @prop()
  readonly original_language: string;

  @Field()
  @prop()
  readonly original_title: string;

  @Field()
  @prop()
  readonly overview: string;

  @Field(() => Int)
  @prop()
  readonly runtime: number;

  @Field(() => Float)
  @prop()
  readonly vote_average: number;

  @Field()
  @prop()
  readonly poster_path: string;

  @Field()
  @prop()
  readonly backdrop_path: string;

  @Field(() => Date)
  @prop({ type: () => Date })
  readonly release_date: Date;

  @Field(() => [MovieGenre])
  @prop({ type: () => MovieGenre })
  readonly genres: MovieGenre[];

  @Field(() => [MovieCompany])
  @prop({ type: () => MovieCompany })
  readonly production_companies: MovieCompany[];

  @Field(() => [MovieLanguage])
  @prop({ type: () => MovieLanguage })
  readonly spoken_languages: MovieLanguage[];

  @Field()
  posterUrl(@Root('poster_path') posterPath: string): string {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  @Field()
  backdropUrl(@Root('backdrop_path') backdropPath: string): string {
    return `https://image.tmdb.org/t/p/w500${backdropPath}`;
  }
}
