import { Field, ObjectType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

/* eslint-disable camelcase */

@ObjectType()
export default class MovieGenre {
  @Field()
  @prop()
  readonly id: string;

  @Field()
  @prop()
  readonly name: string;
}