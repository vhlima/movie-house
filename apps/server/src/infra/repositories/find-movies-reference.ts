import { FindManyOptions } from 'typeorm';

import { IFindMoviesReferenceRepository } from '../../data/contracts';

import {
  MovieReferenceSortTypeModel,
  PaginationInputModel,
  PaginationRepositoryResponseModel,
} from '../../data/models';

import { MovieReference } from '../../domain/entities';

import { MongoDataSource } from '../data-sources';

import { MovieReferenceEntity } from '../entities';

type FindMoviesReferencePaginationInput =
  PaginationInputModel<MovieReferenceSortTypeModel>;

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
      default: {
        return {};
      }
    }
  }

  async getMoviesReferenceById(
    referenceId: string,
    {
      page,
      sort,
      itemsPerPage,
    }: PaginationInputModel<MovieReferenceSortTypeModel>,
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
