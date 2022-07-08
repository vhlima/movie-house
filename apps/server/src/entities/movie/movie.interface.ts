import { Field, Float, ObjectType, Root } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

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

  @Field()
  @prop({ type: () => Float })
  readonly popularity: number;

  @Field()
  @prop()
  readonly poster_path: string;

  @Field()
  @prop()
  readonly backdrop_path: string;

  @Field(() => Date)
  @prop({ type: () => Date })
  readonly release_date: Date;

  @Field()
  posterUrl(@Root() movie: Movie): string {
    return `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  }

  @Field()
  backdropUrl(@Root() movie: Movie): string {
    return `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;
  }
}
