import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';

import MovieSearch from '../entities/movie-search.interface';

import MovieTrending from '../entities/movie-trending';

export default class TmdbAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3/';
  }

  protected willSendRequest(request: RequestOptions): void | Promise<void> {
    request.headers.set('Authorization', `Bearer ${process.env.TMDB_API_KEY}`);
    request.headers.set('Content-Type', 'application/json;charset=utf-8');
  }

  async getCreditsByMovieId(movieId: string | number) {
    const response = await this.get(`movie/${movieId}/credits`);

    return response;
  }

  async getMovieById(movieId: string | number) {
    const response = await this.get(`movie/${movieId}`);

    return {
      ...response,
      release_date: new Date(response.release_date),
    };
  }

  async searchMovie(query: string): Promise<MovieSearch> {
    const response = await this.get<MovieSearch>('search/movie', {
      query,
    });

    return response;
  }

  async getTrendingMoviesWeek(page: number): Promise<MovieTrending> {
    const response = await this.get('/trending/movie/week', {
      page,
    });

    return response;
  }
}
