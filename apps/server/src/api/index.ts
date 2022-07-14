import TmdbAPI from './tmdb';

export { default as TmdbAPI } from './tmdb';

export interface DatasourceContext {
  dataSources: {
    tmdb: TmdbAPI;
  };
}
