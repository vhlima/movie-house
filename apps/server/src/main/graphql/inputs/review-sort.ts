import { Field, InputType } from 'type-graphql';

import { PaginationSortInput } from '../../../domain/entities';
import { ReviewSortType } from '../enums';

import { SortInput } from './sort';

@InputType()
export class ReviewSortInput
  extends SortInput
  implements PaginationSortInput<ReviewSortType>
{
  @Field(() => ReviewSortType)
  type: ReviewSortType;
}
