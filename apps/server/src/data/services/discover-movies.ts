import { PaginationInput, TmDBMovieList } from '../../domain/entities';
import { InvalidFieldError } from '../../domain/errors';
import { DiscoverMovies } from '../../domain/usecases';
import { checkStringForValidPositiveNumber } from '../../utils/string-utils';
import { IDiscoverMoviesRepository } from '../contracts';
import { TmDBMovieSortType } from '../enums';
import { GetTmDBMoviePaginationService } from './get-tmdb-movie-pagination';

const MOVIES_PER_PAGE = 20;

const MIN_MOVIE_AGE = 1870;

type DiscoverMoviesPaginationInput = PaginationInput<TmDBMovieSortType>;

export class DiscoverMoviesService implements DiscoverMovies {
  constructor(
    private readonly discoverMoviesRepository: IDiscoverMoviesRepository,
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

  private validateSort(sort?: DiscoverMoviesPaginationInput['sort']) {
    if (!sort) {
      return;
    }

    const { type, filter } = sort;

    switch (type) {
      case TmDBMovieSortType.YEAR: {
        const year = this.validateFilterNumber(type.toString(), filter);

        if (year > new Date().getFullYear() || year < MIN_MOVIE_AGE) {
          throw new InvalidFieldError('Please, provide a valid year.');
        }
        break;
      }
      case TmDBMovieSortType.DECADE: {
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

  async handle({
    page,
    sort,
  }: DiscoverMoviesPaginationInput): Promise<TmDBMovieList> {
    const discoverMovies =
      await this.discoverMoviesRepository.getMoviesFromDiscover({
        page,
        sort,
        itemsPerPage: MOVIES_PER_PAGE,
      });

    const paginationService = new GetTmDBMoviePaginationService();

    const discoverMoviesPaginated = paginationService.handle(discoverMovies);

    return discoverMoviesPaginated;
  }
}
