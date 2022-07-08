import TmdbAPI from './tmdb';

export interface DatasourceContext {
  dataSources: {
    tmdb: TmdbAPI;
  };
}
