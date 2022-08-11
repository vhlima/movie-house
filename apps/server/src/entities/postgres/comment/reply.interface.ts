import { Field, ID, ObjectType } from 'type-graphql';

import { Column, Entity } from 'typeorm';

import BaseCommentary from './base.interface';

@ObjectType()
@Entity('replies')
export default class Reply extends BaseCommentary {
  @Field(() => ID)
  @Column({ name: 'commentary_id' })
  commentaryId: string;
}
