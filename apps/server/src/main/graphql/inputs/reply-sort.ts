import { Field, InputType } from 'type-graphql';

import { PaginationSortInput } from '../../../domain/entities';

import { ReplySortType } from '../enums';

import { SortInput } from './sort';

@InputType()
export class ReplySortInput
  extends SortInput
  implements PaginationSortInput<ReplySortType>
{
  @Field(() => ReplySortType)
  type: ReplySortType;
}
