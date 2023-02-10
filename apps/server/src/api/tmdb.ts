import { AugmentedRequest, RESTDataSource } from '@apollo/datasource-rest';

import Movie from '../entities/mongo-entities/movie';
import MovieCredits from '../entities/mongo-entities/movie/credits';

import MovieSearch from '../objects/movie-search';
import MovieTrending from '../objects/movie-trending';

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

  async getMovieById(movieId: string | number) {
    try {
      const response = await this.get(`movie/${movieId}`);

      return {
        ...response,
        release_date: new Date(response.release_date),
      };
    } catch (err) {
      return null;
    }
  }

  async searchMovie(
    query: string,
    page: number,
  ): Promise<MovieSearch | undefined> {
    try {
      const response = await this.get<MovieSearch>('search/movie', {
        params: { query, page: `${page}` },
      });

      return response;
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
