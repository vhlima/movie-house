import { Field, Int, ObjectType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

import MoviePerson from '../person/person.interface';

/* eslint-disable camelcase */

@ObjectType()
export default class MovieCrew extends MoviePerson {
  @Field()
  @prop()
  credit_id: string;

  @Field()
  @prop()
  department: string;

  @Field(() => Int)
  @prop()
  job: number;
}
