import { Field, Float, ObjectType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

import Movie from './movie.interface';

@ObjectType()
export default class Rate {
  @Field(() => Movie)
  @prop({ type: () => Movie })
  readonly movie: Movie;

  @Field(() => Float)
  @prop()
  rating: number;

  @Field()
  @prop()
  liked: boolean;

  @Field()
  @prop()
  watched: boolean;
}
