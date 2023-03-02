import { Arg, Int, Query, Resolver } from 'type-graphql';

import {
  getFindListMoviesPaginatedService,
  getFindListMoviesService,
} from '../../factories';

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

    const findMoviesReferencePaginationService =
      getFindListMoviesPaginatedService();

    const response = findMoviesReferencePaginationService.handle(
      moviesResponse.items,
      page,
      moviesResponse.itemsPerPage,
      moviesResponse.totalCount,
    );

    return response;
  }
}
