import { Field, InputType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

@InputType()
class ReviewInput {
  @Field()
  @prop()
  body?: string;
}

export default ReviewInput;
