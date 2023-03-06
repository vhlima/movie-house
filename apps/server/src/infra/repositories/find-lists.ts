import { FindManyOptions } from 'typeorm';

import { IFindListsRepository } from '../../data/contracts';

import {
  PaginationInputModel,
  PaginationPreResponseModel,
} from '../../data/models';

import { List } from '../../domain/entities';
import { ListSortType } from '../../data/enums';

import { PostgresDataSource } from '../data-sources';

import { ListEntity } from '../entities';

type FindListsPaginationInput = PaginationInputModel<ListSortType>;

export class FindListsRepository implements IFindListsRepository {
  private getListRepository() {
    return PostgresDataSource.getRepository(ListEntity);
  }

  private mapSortToFindOptions(
    sort?: FindListsPaginationInput['sort'],
  ): FindManyOptions<ListEntity> {
    if (!sort) {
      return {
        order: {
          createdAt: 'DESC',
        },
      };
    }

    switch (sort.type) {
      case ListSortType.OLDER: {
        return {
          order: {
            createdAt: 'ASC',
          },
        };
      }
      case ListSortType.UPDATED: {
        return {
          order: {
            updatedAt: 'DESC',
          },
        };
      }
      default: {
        return {};
      }
    }
  }

  async getLists(
    { page, itemsPerPage, sort }: PaginationInputModel<ListSortType>,
    userId?: string | undefined,
  ): Promise<PaginationPreResponseModel<List>> {
    const listRepository = this.getListRepository();

    const sortOptions = this.mapSortToFindOptions(sort);

    const [lists, totalCount] = await listRepository.findAndCount({
      where: {
        ...(userId ? { post: { userId } } : {}),
        ...(sortOptions.where || {}),
      },
      ...sortOptions,
      relations: ['post', 'post.user'],
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
    });

    return {
      items: lists,
      page,
      itemsPerPage,
      totalCount,
    };
  }
}
