import { Arg, Int, Query, Resolver } from 'type-graphql';

import {
  getFindListMoviesService,
  getFindPreMadeListMoviesService,
} from '../../factories';

import { PreMadeListType } from '../enums';

import { MovieReferenceSortInput } from '../inputs';

import { MovieReferencePagination } from '../objects/movie-reference-pagination';

@Resolver(() => MovieReferencePagination)
export class FindMoviesReferenceResolver {
  @Query(() => MovieReferencePagination)
  async listMovies(
    @Arg('listId') listId: string,
    @Arg('page', () => Int) page: number,
    @Arg('sort', () => MovieReferenceSortInput, { nullable: true })
    sort?: MovieReferenceSortInput,
  ) {
    const findListMoviesService = getFindListMoviesService();

    const moviesResponse = await findListMoviesService.handle(listId, {
      page,
      sort,
    });

    return moviesResponse;
  }

  @Query(() => MovieReferencePagination)
  async preMadeListMovies(
    @Arg('userId') userId: string,
    @Arg('listType', () => PreMadeListType) listType: PreMadeListType,
    @Arg('page', () => Int) page: number,
    @Arg('sort', () => MovieReferenceSortInput, { nullable: true })
    sort?: MovieReferenceSortInput,
  ) {
    const findPreMadeListMoviesService = getFindPreMadeListMoviesService();

    const moviesResponse = await findPreMadeListMoviesService.handle(
      userId,
      listType,
      {
        page,
        sort,
      },
    );

    return moviesResponse;
  }
}
