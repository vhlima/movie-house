import { Pagination, Movie, PaginationInput } from '../../domain/entities';

import {
  FindMoviesReference,
  FindPreMadeListMovies,
} from '../../domain/usecases';

import { IPreMadeListRepository, IUserRepository } from '../contracts';

import { UserNotFoundError } from '../../domain/errors';
import { MovieReferenceSortType, PreMadeListType } from '../enums';

const MOVIES_PER_PAGE = {
  [PreMadeListType.FAVORITE]: 4,
  [PreMadeListType.WATCHED]: 20,
  [PreMadeListType.WATCHLIST]: 20,
  [PreMadeListType.WATCH_LATER]: 20,
};

export class FindPreMadeListMoviesService implements FindPreMadeListMovies {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly preMadeListRepository: IPreMadeListRepository,
    private readonly findMoviesReference: FindMoviesReference,
  ) {}

  async handle(
    userId: string,
    listType: PreMadeListType,
    props: PaginationInput<MovieReferenceSortType>,
  ): Promise<Pagination<Movie>> {
    const userExists = await this.userRepository.getUserById(userId);

    if (!userExists) {
      throw new UserNotFoundError();
    }

    const listExists = await this.preMadeListRepository.getPreMadeListByType(
      userId,
      listType,
    );

    const moviesPerPage = MOVIES_PER_PAGE[listType];

    if (!listExists) {
      return {
        itemsPerPage: moviesPerPage,
        totalCount: 0,
        totalPages: 1,
        pageInfo: {
          currentPage: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
        edges: [],
      };
    }

    const moviesPaginated = await this.findMoviesReference.handle(
      listExists.id,
      props,
      moviesPerPage,
    );

    return moviesPaginated;
  }
}
