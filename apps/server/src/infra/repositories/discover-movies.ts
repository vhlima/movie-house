import { IDiscoverMoviesRepository } from '../../data/contracts';
import { TmDBMovieListModel } from '../../data/models';
import { SortOptions } from '../../domain/entities';
import { TmdbRepository } from './tmdb';

export class DiscoverMoviesRepository
  extends TmdbRepository
  implements IDiscoverMoviesRepository
{
  async getMoviesFromDiscover(
    page: number,
    sort: SortOptions,
  ): Promise<TmDBMovieListModel | null> {
    try {
      const response = await this.get<TmDBMovieListModel>('discover/movie', {
        params: {
          page: `${page}`,
          ...sort,
        },
      });

      return response;
    } catch (err) {
      return null;
    }
  }
}
