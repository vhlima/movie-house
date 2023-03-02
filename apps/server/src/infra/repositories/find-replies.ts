import { FindManyOptions } from 'typeorm';

import { IFindRepliesRepository } from '../../data/contracts';

import {
  ReplySortTypeModel,
  PaginationInputModel,
  PaginationPreResponseModel,
} from '../../data/models';

import { Reply } from '../../domain/entities';

import { PostgresDataSource } from '../data-sources';

import { ReplyEntity } from '../entities';

type FindRepliesPaginationInput = PaginationInputModel<ReplySortTypeModel>;

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
      case ReplySortTypeModel.CREATE_DATE_ASC: {
        return {
          order: {
            createdAt: 'ASC',
          },
        };
      }
      case ReplySortTypeModel.POPULAR: {
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
    { page, itemsPerPage, sort }: PaginationInputModel<ReplySortTypeModel>,
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
