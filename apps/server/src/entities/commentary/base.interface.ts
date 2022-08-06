import mongoose from 'mongoose';

import { Field, ID, Int, ObjectType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

import type { Ref } from '@typegoose/typegoose';

import User from '../user.interface';

import Timestamps from '../timestamps.interface';

@ObjectType()
export default class CommentaryBase extends Timestamps {
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
