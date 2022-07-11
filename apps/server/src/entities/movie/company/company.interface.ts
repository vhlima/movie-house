import { Field, ObjectType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

/* eslint-disable camelcase */

@ObjectType()
export default class MovieCompany {
  @Field()
  @prop()
  readonly id: string;

  @Field()
  @prop()
  readonly name: string;

  @Field({ nullable: true })
  @prop({ required: false })
  readonly logo_path?: string;

  @Field()
  @prop()
  readonly origin_country: string;
}
