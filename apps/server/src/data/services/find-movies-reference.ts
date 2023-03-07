import { PaginationInput, Pagination, Movie } from '../../domain/entities';

import { InvalidFieldError, PageNotFoundError } from '../../domain/errors';

import { FindMoviesReference } from '../../domain/usecases';
import { checkStringForValidPositiveNumber } from '../../utils/string-utils';

import { IFindMoviesReferenceRepository } from '../contracts';
import { MovieReferenceSortType } from '../enums';
import { GetPaginationService } from './get-pagination';

type FindMoviesReferencePaginationInput =
  PaginationInput<MovieReferenceSortType>;

const MOVIES_PER_PAGE = 20;

const MIN_MOVIE_AGE = 1870;

export class FindMoviesReferenceService implements FindMoviesReference {
  constructor(
    private readonly movieReferenceRepository: IFindMoviesReferenceRepository,
  ) {}

  private validateFilterNumber(type: string, filter?: string): number {
    if (!filter) {
      throw new InvalidFieldError(
        `Sorting by ${type.toString()} requires filter.`,
      );
    }

    if (!checkStringForValidPositiveNumber(filter)) {
      throw new InvalidFieldError(
        `Sorting by ${type.toString()} requires filter to be a number.`,
      );
    }

    const year = parseInt(filter, 10);

    return year;
  }

  private async validateSort(
    sort?: FindMoviesReferencePaginationInput['sort'] | undefined,
  ): Promise<void> {
    if (!sort) {
      return;
    }

    const { type, filter } = sort;

    switch (type) {
      case MovieReferenceSortType.YEAR: {
        const year = this.validateFilterNumber(type.toString(), filter);

        if (year > new Date().getFullYear() || year < MIN_MOVIE_AGE) {
          throw new InvalidFieldError('Please, provide a valid year.');
        }
        break;
      }
      case MovieReferenceSortType.GENRE: {
        // TODO: validate genre
        break;
      }
      case MovieReferenceSortType.DECADE: {
        const year = this.validateFilterNumber(type.toString(), filter);

        const currentYear = new Date().getFullYear();

        if (
          year > currentYear ||
          year < MIN_MOVIE_AGE ||
          (Math.floor(currentYear / 10) * 10 - year) % 10 !== 0
        ) {
          throw new InvalidFieldError('Please, provide a valid decade.');
        }

        break;
      }
      default: {
        break;
      }
    }
  }

  async handle(
    listId: string,
    { page, sort }: FindMoviesReferencePaginationInput,
    itemsPerPage = MOVIES_PER_PAGE,
  ): Promise<Pagination<Movie>> {
    if (page < 1) {
      throw new PageNotFoundError();
    }

    await this.validateSort(sort);

    const moviesResponse =
      await this.movieReferenceRepository.getMoviesReferenceById(listId, {
        page,
        sort,
        itemsPerPage,
      });

    const moviesFormatted = moviesResponse.items.map(response => ({
      ...response.movie,
      backdropUrl: response.movie.backdropPath
        ? `https://image.tmdb.org/t/p/original${response.movie.backdropPath}`
        : '',
      posterUrl: response.movie.posterPath
        ? `https://image.tmdb.org/t/p/w500${response.movie.posterPath}`
        : '',
    }));

    const paginationService = new GetPaginationService<Movie>();

    const paginated = paginationService.handle(
      moviesFormatted,
      page,
      itemsPerPage,
      moviesResponse.totalCount,
    );

    return paginated;
  }
}
