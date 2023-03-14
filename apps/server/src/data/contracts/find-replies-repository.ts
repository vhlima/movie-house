import {
  PaginationInputModel,
  PaginationPreResponseModel,
  ReplyModel,
} from '../models';

import { ReplySortType } from '../enums';

export interface IFindRepliesRepository {
  getReplies(
    commentaryId: string,
    props: PaginationInputModel<ReplySortType>,
  ): Promise<PaginationPreResponseModel<ReplyModel>>;
}
