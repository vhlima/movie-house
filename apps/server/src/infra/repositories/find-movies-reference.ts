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

        return {
          where: {
            'movie.releaseDate': {
              $gte: new Date(`${decade}-01-01T00:00:00.000Z`),
              $lte: new Date(`${decade + 9}-12-31T23:59:59.999Z`),
            },
          } as any,
        };
      }
      case MovieReferenceSortType.YEAR: {
        if (!sort.filter) return {};

        const year = parseInt(sort.filter, 10);

        return {
          where: {
            'movie.releaseDate': {
              $gte: new Date(`${year}-01-01T00:00:00.000Z`),
              $lte: new Date(`${year}-12-31T23:59:59.999Z`),
            },
          } as any,
        };
      }
      case MovieReferenceSortType.GENRE: {
        if (!sort.filter) return {};

        const genreNames = sort.filter.split(',').map(name =>
          name
            .split('-')
            .map(word => word[0].toUpperCase() + word.substring(1, word.length))
            .join(' '),
        );

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
      where: {
        ...(sortOptions.where || {}),
        referenceId,
      },
      ...sortOptions,
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
