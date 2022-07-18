import { Field, Int, ObjectType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

import CommentaryBase from './base.interface';

@ObjectType()
export default class Commentary extends CommentaryBase {
  @Field(() => Int)
  @prop()
  replyCount: number;

  // TODO maybe that not needed
  // @Field(() => [Reply])
  // @prop({ ref: () => Reply })
  // replies: Ref<Reply[]>;
}
