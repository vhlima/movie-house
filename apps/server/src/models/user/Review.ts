import mongoose from 'mongoose';

import { Field, ID, ObjectType } from 'type-graphql';

import { prop, Ref } from '@typegoose/typegoose';

import User from './User';

@ObjectType()
export default class Review {
  @Field(() => ID)
  @prop({
    type: () => mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  readonly _id: string;

  @Field()
  @prop({ required: true })
  movie: string;

  @Field(() => User)
  @prop({ ref: () => User, required: true })
  user: Ref<User>;

  @Field()
  @prop({ required: true })
  body: string;

  @Field(() => [User])
  @prop({ ref: () => User, required: true, default: [] })
  likes: User[];

  @Field(() => Date)
  @prop({ required: true, default: Date.now() })
  createdAt: Date;
}
