import { Field, ObjectType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

import MovieCast from './cast/cast.interface';
import MovieCrew from './crew/crew.interface';

/* eslint-disable camelcase */

@ObjectType()
export default class MovieCredits {
  @Field()
  @prop()
  id: string;

  @Field(() => [MovieCast])
  @prop({ type: () => MovieCast })
  cast: MovieCast[];

  @Field(() => [MovieCrew])
  @prop({ type: () => MovieCrew })
  crew: MovieCrew[];
}
