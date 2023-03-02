import {
  PaginationInputModel,
  CommentarySortTypeModel,
  PaginationPreResponseModel,
  CommentaryModel,
} from '../models';

export interface IFindCommentariesRepository {
  getCommentaries(
    postId: string,
    props: PaginationInputModel<CommentarySortTypeModel>,
  ): Promise<PaginationPreResponseModel<CommentaryModel>>;
}
