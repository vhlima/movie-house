import { Field, Int, ObjectType } from 'type-graphql';

import Movie from '../entities/mongo-entities/movie';

/* eslint-disable camelcase */
@ObjectType()
export default class MovieSearch {
  @Field(() => Int)
  page: number;

  @Field(() => Int, { name: 'totalResults' })
  total_results: number;

  @Field(() => Int, { name: 'totalPages' })
  total_pages: number;

  @Field(() => [Movie])
  results: Movie[];
}
