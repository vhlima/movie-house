import { Field, Int, ObjectType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

import MoviePerson from '../person/person.interface';

/* eslint-disable camelcase */

@ObjectType()
export default class MovieCast extends MoviePerson {
  @Field(() => Int)
  @prop()
  cast_id: number;

  @Field()
  @prop()
  credit_id: string;

  @Field()
  @prop()
  character: string;

  @Field(() => Int)
  @prop()
  order: number;
}
