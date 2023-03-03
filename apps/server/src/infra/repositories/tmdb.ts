import { AugmentedRequest, RESTDataSource } from '@apollo/datasource-rest';

export abstract class TmdbRepository extends RESTDataSource {
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
}
