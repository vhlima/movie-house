import { IMovieRepository } from '../../data/contracts';

import { MovieModel, TmDBMovieListModel } from '../../data/models';
import { MovieGenre } from '../../domain/entities';

import { TmdbRepository } from './tmdb';

export class MovieRepository
  extends TmdbRepository
  implements IMovieRepository
{
  async getMovieGenres(): Promise<MovieGenre[]> {
    try {
      const response = await this.get<{ genres: MovieGenre[] }>(
        'genre/movie/list',
      );

      return response.genres;
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
