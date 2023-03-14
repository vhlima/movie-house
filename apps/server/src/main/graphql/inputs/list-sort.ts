import { Field, InputType } from 'type-graphql';

import { PaginationSortInput } from '../../../domain/entities';

import { ListSortType } from '../enums';

import { SortInput } from './sort';

@InputType()
export class ListSortInput
  extends SortInput
  implements PaginationSortInput<ListSortType>
{
  @Field(() => ListSortType)
  type: ListSortType;
}
