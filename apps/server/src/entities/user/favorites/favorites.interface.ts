import { Field, ObjectType, Root } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

/* eslint-disable camelcase */

@ObjectType()
export default class FavoriteMovie {
  @Field()
  @prop()
  readonly id: string;

  @Field()
  @prop()
  readonly original_title: string;

  @Field()
  @prop()
  readonly poster_path: string;

  @Field()
  posterUrl(@Root('poster_path') posterPath: string): string {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }
}
