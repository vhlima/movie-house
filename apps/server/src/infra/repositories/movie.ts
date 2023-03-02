import { IMovieRepository } from '../../data/contracts';

import { MovieModel } from '../../data/models';

import { TmdbRepository } from './tmdb';

const MAX_PAGINATION_PAGE = 500;

export class MovieRepository
  extends TmdbRepository
  implements IMovieRepository
{
  async getCreditsByMovieId(movieId: number): Promise<MovieModel | null> {
    try {
      const response = await this.get(`movie/${movieId}/credits`);

      return response;
    } catch (err) {
      return null;
    }
  }

  async getMovies(page: number, sort?: any): Promise<MovieModel[]> {
    const sortFilter = {};

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

      return [];
    } catch (err) {
      return [];
    }
  }

  async getMovieById(
    movieId: number,
    withCredits?: boolean,
  ): Promise<MovieModel | null> {
    try {
      const response = await this.get(
        `movie/${movieId}`,
        withCredits
          ? {
              params: {
                append_to_response: 'credits',
              },
            }
          : undefined,
      );

      return response;
    } catch (err) {
      return null;
    }
  }

  async searchMovie(query: string, page: number): Promise<MovieModel[]> {
    try {
      const response = await this.get<any>('search/movie', {
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
      return [];
    }
  }

  async getTrendingMoviesWeek(page: number): Promise<MovieModel[]> {
    try {
      const response = await this.get('trending/movie/week');

      return response;
    } catch (err) {
      return [];
    }
  }

  async getMovieRecommendations(movieId: number): Promise<MovieModel[]> {
    try {
      const response = await this.get(`movie/${movieId}/recommendations`);

      return response;
    } catch (err) {
      return [];
    }
  }
}
