import {
  PreMadeListType,
  Pagination,
  Movie,
  MovieReferenceSortType,
  PaginationInput,
} from '../../domain/entities';

import {
  FindMoviesReference,
  FindPreMadeListMovies,
} from '../../domain/usecases';

import { IPreMadeListRepository, IUserRepository } from '../contracts';

import { UserNotFoundError } from '../../domain/errors';

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

    if (!listExists) {
      return {
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
    );

    return moviesPaginated;
  }
}
