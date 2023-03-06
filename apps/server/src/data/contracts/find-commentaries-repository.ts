import {
  PaginationInputModel,
  PaginationPreResponseModel,
  CommentaryModel,
} from '../models';

import { CommentarySortType } from '../enums';

export interface IFindCommentariesRepository {
  getCommentaries(
    postId: string,
    props: PaginationInputModel<CommentarySortType>,
  ): Promise<PaginationPreResponseModel<CommentaryModel>>;
}
