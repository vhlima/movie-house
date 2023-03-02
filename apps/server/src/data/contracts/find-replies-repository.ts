import {
  PaginationInputModel,
  PaginationPreResponseModel,
  ReplySortTypeModel,
  ReplyModel,
} from '../models';

export interface IFindRepliesRepository {
  getReplies(
    commentaryId: string,
    props: PaginationInputModel<ReplySortTypeModel>,
  ): Promise<PaginationPreResponseModel<ReplyModel>>;
}
