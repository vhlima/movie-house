import { Field, InputType } from 'type-graphql';

import { PaginationSortInput } from '../../../domain/entities';

import { CommentarySortType } from '../enums';

import { SortInput } from './sort';

@InputType()
export class CommentarySortInput
  extends SortInput
  implements PaginationSortInput<CommentarySortType>
{
  @Field(() => CommentarySortType)
  type: CommentarySortType;
}
