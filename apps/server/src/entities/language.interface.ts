import { Field, ObjectType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

/* eslint-disable camelcase */

@ObjectType()
export default class Language {
  @Field()
  @prop()
  readonly name: string;

  @Field()
  @prop()
  readonly english_name: string;

  @Field()
  @prop()
  readonly iso_639_1: string;
}
