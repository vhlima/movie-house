import { Field, Int, ObjectType } from 'type-graphql';

import Movie from './movie.interface';

@ObjectType()
export default class MovieSearch {
  @Field(() => Int)
  page: number;

  @Field(() => [Movie])
  results: Movie[];
}
