import { Field, ObjectType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

@ObjectType()
export default abstract class Timestamps {
  @Field(() => Date)
  @prop({ type: Date, required: false })
  createdAt: Date;

  @Field(() => Date)
  @prop({ type: Date, required: false })
  updatedAt: Date;
}
