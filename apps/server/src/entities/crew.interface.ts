import { Field, Int, ObjectType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

import Person from './person.interface';

/* eslint-disable camelcase */

@ObjectType()
export default class Crew extends Person {
  @Field()
  @prop()
  readonly credit_id: string;

  @Field()
  @prop()
  readonly department: string;

  @Field(() => Int)
  @prop()
  readonly job: number;
}
