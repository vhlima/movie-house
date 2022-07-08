import { RESTDataSource } from 'apollo-datasource-rest';

const API_KEY = '2b632ec34dffd121ca57d8a8596d0c27';

const API_KEY_V4 =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjYzMmVjMzRkZmZkMTIxY2E1N2Q4YTg1OTZkMGMyNyIsInN1YiI6IjYyYzdkNGU5MTJjNjA0MDA2NzllNTkxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ba6ApGFlIbFVeu7xO42yDSWZ6a-GGAHZyoOkVb159Og';

export default class TmdbAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3/';
  }

  async getMovie(id: string) {
    const response = await this.get(
      `movie/${id}`,
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
}
