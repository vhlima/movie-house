import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType('ProfileStats')
export class ProfileStatsEntity {
  @Field(() => Int)
  followerCount: number;

  @Field(() => Int)
  followingCount: number;

  @Field(() => Int)
  listCount: number;

  @Field(() => Int)
  moviesWatchedCount: number;

  @Field(() => Int)
  moviesWatchedThisYearCount: number;
}
