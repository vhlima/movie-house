import { Field, InputType } from 'type-graphql';

import { PaginationSortInput } from '../../../domain/entities';

import { MovieReferenceSortType } from '../enums';

import { SortInput } from './sort';

@InputType()
export class MovieReferenceSortInput
  extends SortInput
  implements PaginationSortInput<MovieReferenceSortType>
{
  @Field(() => MovieReferenceSortType)
  type: MovieReferenceSortType;
}
