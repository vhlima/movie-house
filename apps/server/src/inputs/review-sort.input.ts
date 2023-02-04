import { Field, InputType } from 'type-graphql';

import ReviewSortType from '../enums/ReviewSortType';

import SortInput from './sort.input';

@InputType()
export default class ReviewSortInput extends SortInput {
  @Field(() => ReviewSortType)
  type: ReviewSortType;
}
