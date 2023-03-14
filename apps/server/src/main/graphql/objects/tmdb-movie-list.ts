import { ObjectType } from 'type-graphql';

import { createPagination, MovieEntity } from '../../../infra/entities';

@ObjectType()
export class TmDBMovieListPagination extends createPagination<MovieEntity>(
  'TMDBMovieList',
  () => MovieEntity,
) {}
