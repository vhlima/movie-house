import { RESTDataSource } from 'apollo-datasource-rest';

import Movie from '../entities/movie';

const API_KEY = '2b632ec34dffd121ca57d8a8596d0c27';

const API_KEY_V4 =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjYzMmVjMzRkZmZkMTIxY2E1N2Q4YTg1OTZkMGMyNyIsInN1YiI6IjYyYzdkNGU5MTJjNjA0MDA2NzllNTkxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ba6ApGFlIbFVeu7xO42yDSWZ6a-GGAHZyoOkVb159Og';

interface MovieSearchResponse {
  page: number;
  results: Movie[];
}

export default class TmdbAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3/';
  }

  async getMovieById(movieId: string) {
    const response = await this.get(
      `movie/${movieId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${API_KEY_V4}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );

    return response;
  }

  async getMovieWithCustomResponseById(
    movieId: string,
    appendToResponse: ['credits', 'videos'],
  ) {
    const response = await this.get(
      `movie/${movieId}`,
      { append_to_response: appendToResponse },
      {
        headers: {
          Authorization: `Bearer ${API_KEY_V4}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );

    return response;
  }

  async getCreditsByMovieId(movieId: string) {
    const response = await this.get(
      `movie/${movieId}/credits`,
      {},
      {
        headers: {
          Authorization: `Bearer ${API_KEY_V4}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );

    return response;
  }

  async searchMovie(query: string): Promise<MovieSearchResponse> {
    const response = await this.get<MovieSearchResponse>(
      'search/movie',
      { query },
      {
        headers: {
          Authorization: `Bearer ${API_KEY_V4}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );

    return response;
  }
}
