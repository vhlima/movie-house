import { Field, ID, Int, ObjectType } from 'type-graphql';

import { Column, ObjectIdColumn } from 'typeorm';

import User from '../postgres/user.interface';

/* This class is extended by Review and List */

@ObjectType({ isAbstract: true })
export default abstract class Post {
  @Field(() => ID)
  @ObjectIdColumn({ name: '_id' })
  readonly id: string;

  @Column()
  authorId: string;

  @Field(() => User)
  author: User;

  @Field()
  @Column()
  body: string;

  @Field(() => Int)
  likeCount: number;

  @Field(() => Int)
  commentaryCount: number;
}
