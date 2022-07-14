import { Field, InputType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

@InputType()
class ReviewInput {
  @Field()
  @prop({ required: true })
  body: string;
}

export default ReviewInput;
