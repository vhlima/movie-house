import {
  Commentary,
  PaginationPreResponse,
  PaginationInput,
} from '../entities';

import { CommentarySortType } from '../enums';

export interface FindCommentaries {
  handle: (
    postId: string,
    props: PaginationInput<CommentarySortType>,
  ) => Promise<PaginationPreResponse<Commentary>>;
}
