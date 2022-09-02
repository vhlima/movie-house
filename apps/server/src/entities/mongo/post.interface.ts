import { ObjectId } from 'mongodb';

import { Field, ID, Int, ObjectType, Root } from 'type-graphql';

import { Column, ObjectIdColumn } from 'typeorm';

import Like from './like.interface';

import User from '../postgres/user.interface';

import MongoTimestamps from './timestamps.interface';

/* This class is extended by Review and List */

@ObjectType({ isAbstract: true })
export default abstract class Post extends MongoTimestamps {
  @Field(() => ID)
  @ObjectIdColumn({ name: '_id' })
  readonly id: ObjectId;

  @Column()
  authorId: string;

  @Field(() => User)
  author: User;

  @Field()
  @Column()
  body: string;

  @Field(() => [Like])
  likes: Like[];

  @Field(() => Int)
  commentaryCount: number;
}
