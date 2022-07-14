import { Field, Float, InputType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

@InputType()
export default class RateInput {
  @Field(() => Float, { nullable: true })
  @prop({ required: false })
  rating?: number;

  @Field({ nullable: true })
  @prop({ required: false })
  liked?: boolean;

  @Field({ nullable: true })
  @prop({ required: false })
  watched?: boolean;
}
