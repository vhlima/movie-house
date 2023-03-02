import { ObjectType } from 'type-graphql';

import {
  createPagination,
  MovieReferenceEntity,
} from '../../../infra/entities';

@ObjectType()
export class MovieReferencePagination extends createPagination<MovieReferenceEntity>(
  'MovieReference',
  () => MovieReferenceEntity,
) {}
