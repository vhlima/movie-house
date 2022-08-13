import type { UserData } from '../User/types';

import type Pagination from '../pagination';

import type { PaginationInput } from '../pagination';

import type CreatedAndUpdatedAt from '../timestamps';

export interface CommentaryData extends CreatedAndUpdatedAt {
  id: string;
  postId: string;
  user: UserData;
  body: string;
  likeCount: number;
  replyCount: number;
}

export interface AddCommentaryInput {
  postId: string;
  body: string;
}

export interface AddCommentaryResponse {
  comment: CommentaryData;
}

export interface FindCommentariesResponse {
  commentaries: Pagination<CommentaryData>;
}

export interface FindCommentariesInput extends PaginationInput {
  postId: string;
}

export interface DeleteCommentaryInput {
  commentaryId: string;
}
