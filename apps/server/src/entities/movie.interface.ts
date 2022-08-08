import { Field, Float, Int, ObjectType, Root } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

import Genre from './genre.interface';

import Company from './company.interface';

import Language from './language.interface';

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

  @Field(() => [Genre])
  @prop({ type: () => Genre })
  readonly genres: Genre[];

  @Field(() => [Company])
  @prop({ type: () => Company })
  readonly production_companies: Company[];

  @Field(() => [Language])
  @prop({ type: () => Language })
  readonly spoken_languages: Language[];

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
