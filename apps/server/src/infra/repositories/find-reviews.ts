import { Between, FindManyOptions } from 'typeorm';

import { IFindReviewsRepository } from '../../data/contracts';

import {
  PaginationInputModel,
  PaginationPreResponseModel,
} from '../../data/models';

import { ReviewSortType } from '../../data/enums';

import { Review } from '../../domain/entities';

import { PostgresDataSource } from '../data-sources';

import { ReviewEntity } from '../entities';

type FindReviewsPaginationInput = PaginationInputModel<ReviewSortType>;

export class FindReviewsRepository implements IFindReviewsRepository {
  private getReviewRepository() {
    return PostgresDataSource.getRepository(ReviewEntity);
  }

  private mapSortToFindOptions(
    sort?: FindReviewsPaginationInput['sort'],
  ): FindManyOptions<ReviewEntity> {
    if (!sort) {
      return {};
    }

    const { type, filter } = sort;

    switch (type) {
      case ReviewSortType.PINNED: {
        return {
          where: {
            isPinned: true,
          },
        };
      }
      case ReviewSortType.YEAR: {
        const year = parseInt(filter as string, 10);

        return {
          where: {
            post: {
              createdAt: Between(
                new Date(year, 0, 1).getTime(),
                new Date(year + 1, 0, 1).getTime(),
              ),
            },
          },
        };
      }
      default: {
        return {};
      }
    }
  }

  async getReviews(
    { page, itemsPerPage, sort }: PaginationInputModel<ReviewSortType>,
    userId?: string | undefined,
  ): Promise<PaginationPreResponseModel<Review>> {
    const reviewRepository = this.getReviewRepository();

    const sortOptions = this.mapSortToFindOptions(sort);

    const [reviews, totalCount] = await reviewRepository.findAndCount({
      order: {
        post: {
          createdAt: 'DESC',
        },
      },
      where: {
        ...(sortOptions.where || {}),
        post: {
          userId,
        },
      },
      ...sortOptions,
      relations: ['post', 'post.user'],
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
    });

    return {
      items: reviews,
      page,
      itemsPerPage,
      totalCount,
    };
  }
}
