import { Field, InputType } from 'type-graphql';

import { PaginationSortInput } from '../../../domain/entities';

import { CommentarySortType } from '../enums/CommentarySortType';

import { SortInput } from './sort';

@InputType()
export class ReviewSortInput
  extends SortInput
  implements PaginationSortInput<CommentarySortType>
{
  @Field(() => CommentarySortType)
  type: CommentarySortType;
}
