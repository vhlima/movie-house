import { Field, Int, ObjectType } from 'type-graphql';

import { Entity } from 'typeorm';

import BaseCommentary from './base.interface';

@ObjectType()
@Entity('commentaries')
export default class Commentary extends BaseCommentary {
  @Field(() => Int)
  replyCount: number;
}
