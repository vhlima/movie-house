import GithubAPI from './github';

import TmdbAPI from './tmdb';

export { default as TmdbAPI } from './tmdb';

export { default as GithubAPI } from './github';

export interface DatasourceContext {
  dataSources: {
    tmdb: TmdbAPI;
    github: GithubAPI;
  };
}
