import { TmDBMovieList } from '../entities';

export interface SearchMovie {
  handle: (searchTerm: string, page: number) => Promise<TmDBMovieList>;
}
