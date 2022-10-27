import { Field, ObjectType } from 'type-graphql';

import Review from '../mongo-entities/review.interface';

@ObjectType()
export default class ProfileReviews {
  @Field(() => [Review])
  pinnedReviews: Review[];

  @Field(() => [Review])
  recentReviews: Review[];

  @Field(() => [Review])
  popularReviews: Review[];
}
