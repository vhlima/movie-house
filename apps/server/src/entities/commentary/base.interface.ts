import mongoose from 'mongoose';

import { Field, ID, Int, ObjectType } from 'type-graphql';

import { prop, Ref } from '@typegoose/typegoose';

import User from '../user.interface';

@ObjectType()
export default class CommentaryBase {
  @Field(() => ID)
  @prop({
    type: () => mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  readonly _id: string;

  @Field(() => ID)
  @prop({ type: () => mongoose.Schema.Types.ObjectId })
  readonly postId: string;

  @Field(() => User)
  @prop({ ref: () => User })
  readonly user: Ref<User>;

  @Field()
  @prop()
  body: string;

  @Field(() => Int)
  @prop()
  likeCount: number;
}
