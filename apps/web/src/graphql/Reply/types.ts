import type { UserData } from '../User/types';

import CreatedAndUpdatedAt from '../timestamps';

import Pagination, { PaginationInput } from '../pagination';

export interface ReplyData extends CreatedAndUpdatedAt {
  id: string;
  postId: string;
  commentaryId: string;
  user: UserData;
  body: string;
  likes: UserData[];
}

export interface AddReplyResponse {
  reply: ReplyData;
}

export interface AddReplyInput {
  commentaryId: string;
  body: string;
}

export interface FindRepliesInput extends PaginationInput {
  commentaryId: string;
}

export type FindRepliesCacheInput = Omit<FindRepliesInput, 'first' | 'after'>;

export interface FindRepliesResponse {
  replies: Pagination<ReplyData>;
}

export interface DeleteReplyInput {
  replyId: string;
}
