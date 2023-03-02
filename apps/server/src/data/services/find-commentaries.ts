import {
  Commentary,
  PaginationInput,
  PaginationPreResponse,
} from '../../domain/entities';

import { NotFoundError, PageNotFoundError } from '../../domain/errors';

import { FindCommentaries } from '../../domain/usecases';

import { IFindCommentariesRepository, IPostRepository } from '../contracts';

import { CommentarySortTypeModel } from '../models';

const COMMENTARIES_PER_PAGE = 2;

type FindCommentariesPaginationInput = PaginationInput<CommentarySortTypeModel>;

export class FindCommentariesService implements FindCommentaries {
  constructor(
    private readonly postRepository: IPostRepository,
    private readonly findCommentaryRepository: IFindCommentariesRepository,
  ) {}

  async handle(
    postId: string,
    { page, sort }: FindCommentariesPaginationInput,
  ): Promise<PaginationPreResponse<Commentary>> {
    if (page < 1) {
      throw new PageNotFoundError();
    }

    const postFound = await this.postRepository.getPostById(postId);

    if (!postFound) {
      throw new NotFoundError('PostNotFoundError', 'Post not found.');
    }

    const commentariesResponse =
      await this.findCommentaryRepository.getCommentaries(postId, {
        page,
        sort,
        itemsPerPage: COMMENTARIES_PER_PAGE,
      });

    return commentariesResponse;
  }
}
