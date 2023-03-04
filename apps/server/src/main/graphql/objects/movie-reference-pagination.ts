import { ObjectType } from 'type-graphql';

import { createPagination, MovieEntity } from '../../../infra/entities';

@ObjectType()
export class MovieReferencePagination extends createPagination<MovieEntity>(
  'MoviePagination',
  () => MovieEntity,
) {}
