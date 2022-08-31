import { Field, ObjectType } from 'type-graphql';

import Review from './mongo/review.interface';

@ObjectType()
export default class FeaturedReviews {
  @Field(() => [Review])
  pinnedReviews: Review[];

  @Field(() => [Review])
  recentReviews: Review[];

  @Field(() => [Review])
  popularReviews: Review[];
}
