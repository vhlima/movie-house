import { Field, Int, ObjectType } from 'type-graphql';

import Movie from './mongo-entities/movie';

@ObjectType()
export default class MovieSearch {
  @Field(() => Int)
  page: number;

  @Field(() => [Movie])
  results: Movie[];
}
