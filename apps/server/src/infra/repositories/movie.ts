import { IMovieRepository } from '../../data/contracts';

import { MovieModel, TmDBMovieListModel } from '../../data/models';

import { TmdbRepository } from './tmdb';

export class MovieRepository
  extends TmdbRepository
  implements IMovieRepository
{
  async getDiscoverMovies(
    page: number,
    sort?: any,
  ): Promise<TmDBMovieListModel | null> {
    try {
      const sortFilter = {};

      const response = await this.get<TmDBMovieListModel>('discover/movie', {
        params: {
          page: `${page}`,
          ...(sort ? sortFilter : {}),
        },
      });

      return response;
    } catch (err) {
      return null;
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

  async searchMovie(
    query: string,
    page: number,
  ): Promise<TmDBMovieListModel | null> {
    try {
      const response = await this.get<TmDBMovieListModel>('search/movie', {
        params: {
          query,
          page: `${page}`,
        },
      });

      return response;
    } catch (err) {
      return null;
    }
  }

  async getTrendingMoviesWeek(
    page: number,
  ): Promise<TmDBMovieListModel | null> {
    try {
      const response = await this.get('trending/movie/week', {
        params: {
          page: `${page}`,
        },
      });

      return response;
    } catch (err) {
      return null;
    }
  }

  async getMovieRecommendations(
    movieId: number,
    page: number,
  ): Promise<TmDBMovieListModel | null> {
    try {
      const response = await this.get(`movie/${movieId}/recommendations`, {
        params: {
          page: `${page}`,
        },
      });

      return response;
    } catch (err) {
      return null;
    }
  }
}
