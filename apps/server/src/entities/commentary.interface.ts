import mongoose from 'mongoose';

import { Field, ID, Int, ObjectType } from 'type-graphql';

import { prop, Ref } from '@typegoose/typegoose';

import User from './user.interface';

import CommentaryType from '../enum/commentary.enum';

@ObjectType()
export default class Commentary {
  @Field(() => ID)
  @prop({
    type: () => mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  readonly _id: string;

  @Field(() => CommentaryType)
  @prop({ type: String })
  readonly commentaryType: CommentaryType;

  @Field(() => ID)
  @prop({ type: () => mongoose.Schema.Types.ObjectId })
  readonly referenceId: string;

  @Field(() => User)
  @prop({ ref: () => User })
  readonly user: Ref<User>;

  @Field()
  @prop()
  body: string;

  @Field(() => Int)
  @prop()
  likeCount: number;

  @Field(() => Int)
  @prop()
  repliesCount: number;
}
