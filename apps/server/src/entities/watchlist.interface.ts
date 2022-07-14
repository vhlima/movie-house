import { Field, ObjectType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

import Movie from './movie.interface';

@ObjectType()
export default class WatchlistItem {
  @Field(() => Movie)
  @prop({ type: () => Movie })
  readonly movie: Movie;

  @Field(() => Date)
  @prop({ type: () => Date, required: false, default: Date.now() })
  createdAt: Date;
}
