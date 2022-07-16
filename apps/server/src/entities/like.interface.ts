import mongoose from 'mongoose';

import { Field, ID, ObjectType } from 'type-graphql';

import { prop, Ref } from '@typegoose/typegoose';

import User from './user.interface';

import LikeType from '../enum/like.enum';

@ObjectType()
export default class Like {
  @Field(() => ID)
  @prop({
    type: () => mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  readonly _id: string;

  @Field(() => LikeType)
  @prop({ type: String })
  readonly likeType: LikeType;

  @Field(() => ID)
  @prop({ type: () => mongoose.Schema.Types.ObjectId })
  readonly referenceId: string;

  @Field(() => ID, { nullable: true })
  @prop({ type: () => mongoose.Schema.Types.ObjectId, required: false })
  readonly rootId?: string;

  @Field(() => User)
  @prop({ ref: () => User })
  readonly user: Ref<User>;
}
