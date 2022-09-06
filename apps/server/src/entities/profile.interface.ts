import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export default class UserProfile {
  @Field(() => Int)
  followerCount: number;

  @Field(() => Int)
  followingCount: number;

  @Field(() => Int)
  moviesWatchedCount: number;

  @Field(() => Int)
  moviesWatchedThisYearCount: number;

  @Field(() => Int)
  listCount: number;
}
