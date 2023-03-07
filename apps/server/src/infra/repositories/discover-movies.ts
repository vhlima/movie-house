import { IDiscoverMoviesRepository } from '../../data/contracts';
import { PaginationInputModel, TmDBMovieListModel } from '../../data/models';
import { TmDBMovieSortType } from '../../domain/enums';
import {
  getStartAndEndOfDecade,
  getStartAndEndOfYear,
} from '../../utils/date-utils';
import { TmdbRepository } from './tmdb';

type DiscoverMoviesPaginationInput = PaginationInputModel<TmDBMovieSortType>;

export class DiscoverMoviesRepository
  extends TmdbRepository
  implements IDiscoverMoviesRepository
{
  private mapSortToParams(
    sort?: DiscoverMoviesPaginationInput['sort'],
  ): Record<string, unknown> {
    if (!sort) {
      return {};
    }

    const { type, filter } = sort;

    switch (type) {
      case TmDBMovieSortType.DECADE: {
        if (!filter) break;

        const decade = parseInt(filter, 10);

        const [start, end] = getStartAndEndOfDecade(decade);

        return {
          'primary_release_date.gte': start.toISOString(),
          'primary_release_date.lte': end.toISOString(),
        };
      }
      case TmDBMovieSortType.YEAR: {
        if (!filter) break;

        const year = parseInt(filter, 10);

        const [start, end] = getStartAndEndOfYear(year);

        return {
          sort_by: 'primary_release_date.asc',
          'primary_release_date.gte': start.toISOString(),
          'primary_release_date.lte': end.toISOString(),
        };
      }
      case TmDBMovieSortType.RELEASE_OLDER: {
        return {
          sort_by: 'release_date.asc',
        };
      }
      case TmDBMovieSortType.RELEASE_RECENT: {
        return {
          sort_by: 'release_date.desc',
        };
      }
      default: {
        break;
      }
    }

    return {};
  }

  async getMoviesFromDiscover({
    page,
    sort,
  }: DiscoverMoviesPaginationInput): Promise<TmDBMovieListModel | null> {
    try {
      const sortFilter = this.mapSortToParams(sort);

      const response = await this.get<TmDBMovieListModel>('discover/movie', {
        params: {
          page: `${page}`,
          ...sortFilter,
        },
      });

      return response;
    } catch (err) {
      return null;
    }
  }
}
