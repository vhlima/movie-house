import {
  PaginationInput,
  PaginationPreResponse,
  Reply,
} from '../../domain/entities';

import { NotFoundError, PageNotFoundError } from '../../domain/errors';

import { FindReplies } from '../../domain/usecases';

import { ICommentaryRepository, IFindRepliesRepository } from '../contracts';

import { ReplySortTypeModel } from '../models';

const COMMENTARIES_PER_PAGE = 2;

type FindRepliesPaginationInput = PaginationInput<ReplySortTypeModel>;

export class FindRepliesService implements FindReplies {
  constructor(
    private readonly commentaryRepository: ICommentaryRepository,
    private readonly findRepliesRepository: IFindRepliesRepository,
  ) {}

  async handle(
    commentaryId: string,
    { page, sort }: FindRepliesPaginationInput,
  ): Promise<PaginationPreResponse<Reply>> {
    if (page < 1) {
      throw new PageNotFoundError();
    }

    const commentaryFound = await this.commentaryRepository.getCommentaryById(
      commentaryId,
    );

    if (!commentaryFound) {
      throw new NotFoundError(
        'CommentaryNotFoundError',
        'Commentary not found.',
      );
    }

    const repliesResponse = await this.findRepliesRepository.getReplies(
      commentaryId,
      {
        page,
        sort,
        itemsPerPage: COMMENTARIES_PER_PAGE,
      },
    );

    return repliesResponse;
  }
}
