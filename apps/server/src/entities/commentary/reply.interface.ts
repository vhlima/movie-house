import mongoose from 'mongoose';

import { Field, ID, ObjectType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

import CommentaryBase from './base.interface';

@ObjectType()
export default class Reply extends CommentaryBase {
  @Field(() => ID)
  @prop({ type: () => mongoose.Schema.Types.ObjectId })
  commentaryId: string;
}
