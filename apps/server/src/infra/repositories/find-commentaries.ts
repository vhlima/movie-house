import { FindManyOptions } from 'typeorm';

import { IFindCommentariesRepository } from '../../data/contracts';

import {
  PaginationInputModel,
  PaginationPreResponseModel,
} from '../../data/models';

import { CommentarySortType } from '../../data/enums';

import { Commentary } from '../../domain/entities';

import { PostgresDataSource } from '../data-sources';

import { CommentaryEntity } from '../entities';

type FindCommentariesPaginationInput = PaginationInputModel<CommentarySortType>;

export class FindCommentariesRepository implements IFindCommentariesRepository {
  private getCommentaryRepository() {
    return PostgresDataSource.getRepository(CommentaryEntity);
  }

  private mapSortToFindOptions(
    sort?: FindCommentariesPaginationInput['sort'],
  ): FindManyOptions<CommentaryEntity> {
    if (!sort) {
      return {
        order: {
          createdAt: 'DESC',
        },
      };
    }

    switch (sort.type) {
      case CommentarySortType.OLDER: {
        return {
          order: {
            createdAt: 'ASC',
          },
        };
      }
      case CommentarySortType.POPULAR: {
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

  async getCommentaries(
    postId: string,
    { page, itemsPerPage, sort }: PaginationInputModel<CommentarySortType>,
  ): Promise<PaginationPreResponseModel<Commentary>> {
    const commentaryRepository = this.getCommentaryRepository();

    const sortOptions = this.mapSortToFindOptions(sort);

    const [commentaries, totalCount] = await commentaryRepository.findAndCount({
      where: {
        ...(sortOptions.where || {}),
        postId,
      },
      ...sortOptions,
      relations: ['user'],
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
    });

    return {
      items: commentaries,
      page,
      itemsPerPage,
      totalCount,
    };
  }
}
