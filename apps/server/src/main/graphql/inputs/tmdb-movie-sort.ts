import { Field, InputType } from 'type-graphql';

import { PaginationSortInput } from '../../../domain/entities';
import { TmDBMovieSortType } from '../enums';

import { SortInput } from './sort';

@InputType()
export class TmDBMovieSortInput
  extends SortInput
  implements PaginationSortInput<TmDBMovieSortType>
{
  @Field(() => TmDBMovieSortType)
  type: TmDBMovieSortType;
}
