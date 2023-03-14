import { FindManyOptions } from 'typeorm';

import { IFindRepliesRepository } from '../../data/contracts';

import {
  PaginationInputModel,
  PaginationPreResponseModel,
} from '../../data/models';

import { ReplySortType } from '../../data/enums';

import { Reply } from '../../domain/entities';

import { PostgresDataSource } from '../data-sources';

import { ReplyEntity } from '../entities';

type FindRepliesPaginationInput = PaginationInputModel<ReplySortType>;

export class FindRepliesRepository implements IFindRepliesRepository {
  private getRepliesRepository() {
    return PostgresDataSource.getRepository(ReplyEntity);
  }

  private mapSortToFindOptions(
    sort?: FindRepliesPaginationInput['sort'],
  ): FindManyOptions<ReplyEntity> {
    if (!sort) {
      return {
        order: {
          createdAt: 'DESC',
        },
      };
    }

    switch (sort.type) {
      case ReplySortType.OLDER: {
        return {
          order: {
            createdAt: 'ASC',
          },
        };
      }
      case ReplySortType.POPULAR: {
        return {
          // order: {
          //   likeCount: 'ASC',
          // },
        };
      }
      default: {
        return {};
      }
    }
  }

  async getReplies(
    commentaryId: string,
    { page, itemsPerPage, sort }: PaginationInputModel<ReplySortType>,
  ): Promise<PaginationPreResponseModel<Reply>> {
    const replyRepository = this.getRepliesRepository();

    const sortOptions = this.mapSortToFindOptions(sort);

    const [replies, totalCount] = await replyRepository.findAndCount({
      where: {
        ...(sortOptions.where || {}),
        commentaryId,
      },
      ...sortOptions,
      relations: ['user'],
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
    });

    return {
      items: replies,
      page,
      itemsPerPage,
      totalCount,
    };
  }
}
