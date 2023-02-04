import { Field, InputType } from 'type-graphql';

import MovieSortType from '../enums/MovieSortType';

import SortInput from './sort.input';

@InputType()
export default class MovieSortInput extends SortInput {
  @Field(() => MovieSortType)
  type: MovieSortType;
}
