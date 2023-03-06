import { Reply, PaginationPreResponse, PaginationInput } from '../entities';

import { ReplySortType } from '../enums';

export interface FindReplies {
  handle: (
    commentaryId: string,
    props: PaginationInput<ReplySortType>,
  ) => Promise<PaginationPreResponse<Reply>>;
}
