import { AugmentedRequest, RESTDataSource } from '@apollo/datasource-rest';

import Movie from '../entities/mongo-entities/movie';
import Genre from '../entities/mongo-entities/movie/genre.interface';

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

  async getCreditsByMovieId(movieId: string | number) {
    const response = await this.get(`movie/${movieId}/credits`);

    return response;
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

  async searchMovie(query: string): Promise<MovieSearch> {
    const response = await this.get<MovieSearch>('search/movie', {
      params: { query },
    });

    return response;
  }

  async getTrendingMoviesWeek(page: number): Promise<MovieTrending> {
    const response = await this.get('trending/movie/week');

    return response;
  }

  async getMovieGenres(): Promise<{ genres: Genre[] }> {
    const response = await this.get('genre/list');

    return response;
  }

  async getMovieRecommendations(
    movieId: number,
  ): Promise<{ page: number; results: Movie[] }> {
    const response = await this.get(`movie/${movieId}/recommendations`);

    return response;
  }
}
