import {
  PaginationInput,
  PaginationPreResponse,
  Review,
} from '../../domain/entities';

import { FindReviews } from '../../domain/usecases';

import { IFindReviewsRepository, IUserRepository } from '../contracts';

import {
  InvalidFieldError,
  PageNotFoundError,
  UserNotFoundError,
} from '../../domain/errors';

import { ReviewSortType } from '../enums';

import { checkStringForValidPositiveNumber } from '../../utils/string-utils';

const REVIEWS_PER_PAGE = 2;

type FindReviewsPaginationInput = PaginationInput<ReviewSortType>;

export class FindReviewsService implements FindReviews {
  constructor(
    private readonly findUserRepository: IUserRepository,
    private readonly findReviewsRepository: IFindReviewsRepository,
  ) {}

  private async validateSort(
    userId?: string,
    sort?: FindReviewsPaginationInput['sort'] | undefined,
  ): Promise<void> {
    if (!sort) {
      return;
    }

    const { type, filter } = sort;

    switch (type) {
      case ReviewSortType.PINNED: {
        if (!userId) {
          throw new UserNotFoundError();
        }

        const userFound = await this.findUserRepository.getUserById(userId);

        if (!userFound) {
          throw new UserNotFoundError();
        }

        break;
      }
      case ReviewSortType.YEAR: {
        if (!filter) {
          throw new InvalidFieldError(
            `Sorting by ${type.toString()} requires filter.`,
          );
        }

        if (!checkStringForValidPositiveNumber(filter)) {
          throw new InvalidFieldError(
            `Sorting by ${type.toString()} requires filter to be a number.`,
          );
        }

        const year = parseInt(filter, 10);

        if (
          year > new Date().getFullYear() ||
          year < new Date().getFullYear() - 1
        ) {
          throw new InvalidFieldError('Please, provide a valid year.');
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  async handle(
    { page, sort }: FindReviewsPaginationInput,
    userId?: string,
  ): Promise<PaginationPreResponse<Review>> {
    if (page < 1) {
      throw new PageNotFoundError();
    }

    await this.validateSort(userId, sort);

    const reviewsResponse = await this.findReviewsRepository.getReviews(
      {
        page,
        sort,
        itemsPerPage: REVIEWS_PER_PAGE,
      },
      userId,
    );

    return {
      ...reviewsResponse,
      items: reviewsResponse.items.map(item => ({
        ...item,
        user: item.post.user,
      })),
    };
  }
}
