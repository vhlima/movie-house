import { AugmentedRequest, RESTDataSource } from '@apollo/datasource-rest';

import { addYears, lastDayOfYear } from 'date-fns';

import { splitSortFilter } from '../utils/sort-helper';

import Movie from '../entities/mongo-entities/movie';
import MovieCredits from '../entities/mongo-entities/movie/credits';
import Genre from '../entities/mongo-entities/movie/genre.interface';

import MovieSortType from '../enums/MovieSortType';

import MovieSortInput from '../inputs/movie-sort.input';

import MoviesPaginated from '../objects/movies-paginated';
import MovieTrending from '../objects/movie-trending';
import StreamingProvider from '../objects/streaming-provider';

const MAX_PAGINATION_PAGE = 500;

export default class TmdbAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3/';
  }

  override willSendRequest(
    _: string,
    request: AugmentedRequest,
  ): void | Promise<void> {
    request.headers.Authorization = `Bearer ${process.env.TMDB_API_KEY}`;
    request.headers['Content-Type'] = 'application/json;charset=utf-8';
  }

  async getCreditsByMovieId(
    movieId: string | number,
  ): Promise<MovieCredits | undefined> {
    try {
      const response = await this.get(`movie/${movieId}/credits`);

      return response;
    } catch (err) {
      return undefined;
    }
  }

  async getMovieGenres(): Promise<Genre[] | undefined> {
    try {
      const response = await this.get(`genre/movie/list`);

      return response.genres;
    } catch (err) {
      return undefined;
    }
  }

  async getStreamingProviders(): Promise<StreamingProvider[] | undefined> {
    try {
      const providers = await this.get('watch/providers/movie', {
        params: {
          watch_region: 'US',
        },
      });

      if (!providers) {
        return undefined;
      }

      const results = providers.results as StreamingProvider[];

      return results
        .sort((p1, p2) => p1.display_priority - p2.display_priority)
        .slice(0, 5);
    } catch (err) {
      return undefined;
    }
  }

  async getMovies(
    page: number,
    sort?: MovieSortInput,
  ): Promise<MoviesPaginated | undefined> {
    let sortFilter = {};

    if (sort) {
      const { type, filter } = sort;

      switch (type) {
        case MovieSortType.YEAR: {
          if (!filter) break;

          sortFilter = { primary_release_year: filter };
          break;
        }
        case MovieSortType.DECADE: {
          if (!filter || Number.isNaN(filter)) break;

          const decadeDate = new Date(parseInt(filter, 10), 0);

          const lastDayOfPreviousDecadeYear = lastDayOfYear(
            new Date(decadeDate.getFullYear() - 1, 0),
          );

          const endOfDecade = new Date(
            addYears(decadeDate, 10).getFullYear(),
            0,
            1,
          );

          sortFilter = {
            'primary_release_date.gte':
              lastDayOfPreviousDecadeYear.toISOString(),
            'primary_release_date.lte': endOfDecade.toISOString(),
          };
          break;
        }
        case MovieSortType.GENRE: {
          if (!filter) break;

          const genres = await this.getMovieGenres();

          if (!genres) break;

          const filterGenres = splitSortFilter(filter);

          const validGenreIds = filterGenres.reduce((agg, value) => {
            const genreFound = genres.find(
              genre =>
                genre.name.toLowerCase() ===
                value.replace('-', ' ').toLowerCase(),
            );
            return genreFound ? [...agg, `${genreFound.id}`] : agg;
          }, [] as string[]);

          sortFilter = {
            with_genres: validGenreIds.join(','),
          };

          break;
        }
        case MovieSortType.RELEASE_DATE_ASC: {
          sortFilter = {
            sort_by: 'release_date.asc',
          };
          break;
        }
        case MovieSortType.RELEASE_DATE_DESC: {
          sortFilter = {
            sort_by: 'release_date.desc',
            /* Make sure that all movies have been released */
            'primary_release_date.lte': new Date().toISOString(),
          };
          break;
        }
        case MovieSortType.POPULARITY_YEAR: {
          sortFilter = {
            sort_by: 'popularity.desc',
            year: new Date().getFullYear(),
          };
          break;
        }
        case MovieSortType.POPULARITY_DESC: {
          sortFilter = {
            sort_by: 'popularity.desc',
          };
          break;
        }
        case MovieSortType.POPULARITY_ASC: {
          sortFilter = {
            sort_by: 'popularity.asc',
          };
          break;
        }
        case MovieSortType.SERVICE: {
          if (!filter) break;

          const streamingServices = await this.getStreamingProviders();

          if (!streamingServices) break;

          const filterGenres = splitSortFilter(filter);

          const validServiceIds = filterGenres.reduce((agg, value) => {
            const serviceFound = streamingServices.find(
              service =>
                service.provider_name.toLowerCase() ===
                value.replace(/-/g, ' ').toLowerCase(),
            );

            return serviceFound ? [...agg, `${serviceFound.provider_id}`] : agg;
          }, [] as string[]);

          sortFilter = {
            with_watch_providers: validServiceIds.join(','),
            watch_region: 'US',
          };

          break;
        }
        default: {
          break;
        }
      }
    }

    try {
      const response = await this.get('discover/movie', {
        params: sort && {
          page: `${page > MAX_PAGINATION_PAGE ? MAX_PAGINATION_PAGE : page}`,
          ...sortFilter,
        },
      });

      if (response) {
        const { total_pages: totalPages } = response;

        return {
          ...response,
          total_pages:
            totalPages > MAX_PAGINATION_PAGE ? MAX_PAGINATION_PAGE : totalPages,
        };
      }

      return undefined;
    } catch (err) {
      return undefined;
    }
  }

  async getMovieById(movieId: number): Promise<Movie | undefined> {
    try {
      const response = await this.get(`movie/${movieId}`);

      return response;
    } catch (err) {
      return undefined;
    }
  }

  async searchMovie(
    query: string,
    page: number,
  ): Promise<MoviesPaginated | undefined> {
    try {
      const response = await this.get<MoviesPaginated>('search/movie', {
        params: {
          query,
          page: `${page > MAX_PAGINATION_PAGE ? MAX_PAGINATION_PAGE : page}`,
        },
      });

      return {
        ...response,
        total_pages: MAX_PAGINATION_PAGE,
      };
    } catch (err) {
      return undefined;
    }
  }

  async getTrendingMoviesWeek(
    page: number,
  ): Promise<MovieTrending | undefined> {
    try {
      const response = await this.get('trending/movie/week');

      return response;
    } catch (err) {
      return undefined;
    }
  }

  async getMovieRecommendations(
    movieId: number,
  ): Promise<{ page: number; results: Movie[] } | undefined> {
    try {
      const response = await this.get(`movie/${movieId}/recommendations`);

      return response;
    } catch (err) {
      return undefined;
    }
  }
}
