import { Field, InputType } from 'type-graphql';

import MovieSortType from '../../enums/MovieSortType';

import MovieSortScalar from '../../scalars/MovieSortScalar';

@InputType()
export default class MovieSortArgs {
  @Field(() => MovieSortType)
  type: MovieSortType;

  @Field(() => MovieSortScalar)
  filter: string | number | number[] | string[];
}
