import mongoose from 'mongoose';

import { Field, ID, ObjectType } from 'type-graphql';

import { prop, Ref } from '@typegoose/typegoose';

import User from './user.interface';

import Movie from './movie.interface';

@ObjectType()
export default class Review {
  @Field(() => ID)
  @prop({
    type: () => mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  readonly _id: string;

  @Field(() => User)
  @prop({
    ref: () => User,
    required: true,
  })
  readonly user: Ref<User>;

  @Field(() => Movie)
  @prop({ type: () => Movie })
  readonly movie: Movie;

  @Field()
  @prop()
  body: string;
}
