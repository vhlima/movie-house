import mongoose from 'mongoose';

import { Field, ID, Int, ObjectType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

import type { Ref } from '@typegoose/typegoose';

import User from './user.interface';

import Commentary from './commentary/commentary.interface';

/* This class is extended by Review and List */

@ObjectType({ isAbstract: true })
export default abstract class Post {
  @Field(() => ID)
  @prop({
    type: () => mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  readonly _id: string;

  @Field(() => User)
  @prop({ ref: () => User })
  readonly author: Ref<User>;

  @Field()
  @prop()
  body: string;

  @Field(() => Int)
  @prop()
  likeCount: number;

  @Field(() => [Commentary])
  @prop({ type: () => Commentary })
  commentaries: Commentary[];

  // todo likes
}

/*

User:
    id:  
    ...

Post:
    id:
    userId:
    ...

Comment:
    id:
    userId:
    postId:

Like:
    id:
    userId:
    postId:
    commentId:

  Post design:

  {
    _id: string;
    user: User;
    body: string;
    likes: User[]
    commentaries: Commentary[]; // only root commentaries here
  }

*/
