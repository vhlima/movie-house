import { Field, Int, ObjectType } from 'type-graphql';

import User from './pg-entities/user.interface';

@ObjectType()
export default class PopularReviewer {
  @Field(() => User)
  user: User;

  @Field(() => Int)
  movieWatchCount: number;

  @Field(() => Int)
  reviewCount: number;
}
