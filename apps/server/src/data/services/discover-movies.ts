import { PaginationInput, TmDBMovieList } from '../../domain/entities';
import { InvalidFieldError } from '../../domain/errors';
import { DiscoverMovies } from '../../domain/usecases';
import {
  getStartAndEndOfDecade,
  getStartAndEndOfYear,
} from '../../utils/date-utils';
import {
  checkStringForValidPositiveNumber,
  convertStringToRegularPattern,
} from '../../utils/string-utils';
import {
  IDiscoverMoviesRepository,
  IMovieRepository,
  IStreamingProviderRepository,
} from '../contracts';
import { TmDBMovieSortType } from '../enums';
import { GetTmDBMoviePaginationService } from './get-tmdb-movie-pagination';

const MIN_MOVIE_AGE = 1870;

type DiscoverMoviesPaginationInput = PaginationInput<TmDBMovieSortType>;

export class DiscoverMoviesService implements DiscoverMovies {
  constructor(
    private readonly discoverMoviesRepository: IDiscoverMoviesRepository,
    private readonly movieRepository: IMovieRepository,
    private readonly streamingProviderRepository: IStreamingProviderRepository,
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

  private async parseSort(
    sort?: DiscoverMoviesPaginationInput['sort'],
  ): Promise<Record<string, unknown>> {
    if (!sort) {
      return {};
    }

    const { type, filter } = sort;

    switch (type) {
      case TmDBMovieSortType.YEAR: {
        const year = this.validateFilterNumber(type.toString(), filter);

        if (year > new Date().getFullYear() || year < MIN_MOVIE_AGE) {
          throw new InvalidFieldError('Please, provide a valid year.');
        }

        const [start, end] = getStartAndEndOfYear(year);

        return {
          sort_by: 'primary_release_date.asc',
          'primary_release_date.gte': start.toISOString(),
          'primary_release_date.lte': end.toISOString(),
        };
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

        const [start, end] = getStartAndEndOfDecade(year);

        return {
          'primary_release_date.gte': start.toISOString(),
          'primary_release_date.lte': end.toISOString(),
        };
      }
      case TmDBMovieSortType.GENRE: {
        if (!filter) {
          throw new InvalidFieldError(
            `Sorting by ${type.toString()} requires filter.`,
          );
        }

        const movieGenres = await this.movieRepository.getMovieGenres();

        const genreNames = filter
          .split('+')
          .map(name => convertStringToRegularPattern(name));

        const genresIds = genreNames.reduce((agg: number[], value) => {
          const genreFound = movieGenres.find(
            genre => genre.name.toLowerCase() === value.toLowerCase(),
          );

          if (!genreFound) {
            return agg;
          }

          return [...agg, genreFound.id];
        }, []);

        return {
          with_genres: genresIds,
        };
      }
      case TmDBMovieSortType.SERVICE: {
        if (!filter) {
          throw new InvalidFieldError(
            `Sorting by ${type.toString()} requires filter.`,
          );
        }

        const streamingProviders =
          await this.streamingProviderRepository.getStreamingProviders();

        const streamingProvidersNames = filter
          .split('+')
          .map(name => convertStringToRegularPattern(name));

        const streamingProvidersIds = streamingProvidersNames.reduce(
          (agg: number[], value) => {
            const streamingProviderFound = streamingProviders.find(
              provider =>
                provider.provider_name.toLowerCase() === value.toLowerCase(),
            );

            if (!streamingProviderFound) {
              return agg;
            }

            return [...agg, streamingProviderFound.provider_id];
          },
          [],
        );

        return {
          watch_region: 'US',
          with_watch_providers: streamingProvidersIds.join('|'),
        };
      }
      case TmDBMovieSortType.RELEASE_OLDER: {
        return {
          sort_by: 'release_date.asc',
        };
      }
      case TmDBMovieSortType.RELEASE_RECENT: {
        return {
          sort_by: 'release_date.desc',
        };
      }
      default: {
        return {};
      }
    }
  }

  async handle({
    page,
    sort,
  }: DiscoverMoviesPaginationInput): Promise<TmDBMovieList> {
    const sortOptions = await this.parseSort(sort);

    const discoverMovies =
      await this.discoverMoviesRepository.getMoviesFromDiscover(
        page,
        sortOptions,
      );

    const paginationService = new GetTmDBMoviePaginationService();

    const discoverMoviesPaginated = paginationService.handle(discoverMovies);

    return discoverMoviesPaginated;
  }
}
