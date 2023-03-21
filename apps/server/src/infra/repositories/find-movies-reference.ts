import { Between, FindManyOptions, Any } from 'typeorm';

import { IFindMoviesReferenceRepository } from '../../data/contracts';

import {
  PaginationInputModel,
  PaginationRepositoryResponseModel,
} from '../../data/models';

import { MovieReferenceSortType } from '../../data/enums';

import { MovieReference } from '../../domain/entities';

import { MongoDataSource } from '../data-sources';

import { MovieReferenceEntity } from '../entities';
import {
  getStartAndEndOfDecade,
  getStartAndEndOfYear,
} from '../../utils/date-utils';
import { convertStringToRegularPattern } from '../../utils/string-utils';

type FindMoviesReferencePaginationInput =
  PaginationInputModel<MovieReferenceSortType>;

export class FindMoviesReferenceRepository
  implements IFindMoviesReferenceRepository
{
  private getMovieReferenceRepository() {
    return MongoDataSource.getRepository(MovieReferenceEntity);
  }

  private mapSortToFindOptions(
    sort?: FindMoviesReferencePaginationInput['sort'],
  ): FindManyOptions<MovieReferenceEntity> {
    if (!sort) {
      return {};
    }

    switch (sort.type) {
      case MovieReferenceSortType.DECADE: {
        if (!sort.filter) return {};

        const decade = parseInt(sort.filter, 10);

        const [start, end] = getStartAndEndOfDecade(decade);

        return {
          where: {
            'movie.releaseDate': {
              $gte: start,
              $lte: end,
            },
          } as any,
        };
      }
      case MovieReferenceSortType.YEAR: {
        if (!sort.filter) return {};

        const year = parseInt(sort.filter, 10);

        const [start, end] = getStartAndEndOfYear(year);

        return {
          where: {
            'movie.releaseDate': {
              $gte: start,
              $lte: end,
            },
          } as any,
        };
      }
      case MovieReferenceSortType.GENRE: {
        if (!sort.filter) return {};

        const genreNames = sort.filter
          .split('+')
          .map(name => convertStringToRegularPattern(name));

        return {
          where: {
            'movie.genres': {
              $elemMatch: { name: { $in: genreNames } },
            },
          } as any,
        };
      }

      case MovieReferenceSortType.RELEASE_RECENT: {
        return {
          order: {
            movie: {
              releaseDate: 'DESC',
            },
          },
        };
      }
      case MovieReferenceSortType.RELEASE_OLDER: {
        return {
          order: {
            movie: {
              releaseDate: 'ASC',
            },
          },
        };
      }
      default: {
        return {};
      }
    }
  }

  async getMoviesReferenceById(
    referenceId: string,
    { page, sort, itemsPerPage }: PaginationInputModel<MovieReferenceSortType>,
  ): Promise<PaginationRepositoryResponseModel<MovieReference>> {
    const movieReferenceRepository = this.getMovieReferenceRepository();

    const sortOptions = this.mapSortToFindOptions(sort);

    const [movies, totalCount] = await movieReferenceRepository.findAndCount({
      ...sortOptions,
      where: {
        ...(sortOptions.where || {}),
        referenceId,
      },
      relations: ['user'],
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
    });

    return {
      items: movies,
      totalCount,
    };
  }
}
