import { RESTDataSource } from 'apollo-datasource-rest';

import Movie from '../entities/mongo-entities/movie';

interface MovieSearchResponse {
  page: number;
  results: Movie[];
}

export default class TmdbAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3/';
  }

  async getCreditsByMovieId(movieId: string | number) {
    const response = await this.get(
      `movie/${movieId}/credits`,
      {},
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );

    return response;
  }

  async getMovieById(movieId: string | number) {
    const response = await this.get(
      `movie/${movieId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );

    // TODO throw error here on movie not found

    return {
      ...response,
      release_date: new Date(response.release_date),
    };
  }

  async searchMovie(query: string): Promise<MovieSearchResponse> {
    const response = await this.get<MovieSearchResponse>(
      'search/movie',
      { query },
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );

    return response;
  }
}
