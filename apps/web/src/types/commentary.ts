// todo maybe add these types to a shared package

import type { UserResponse } from './user';

import type { CreatedAndUpdatedAt } from './timestamps';

export interface CommentaryBaseResponse extends CreatedAndUpdatedAt {
  _id: string;
  postId: string;
  user: UserResponse;
  body: string;
  likeCount: number;
}

export interface CommentaryResponse extends CommentaryBaseResponse {
  replyCount: number;
}

export interface CommentaryCacheData {
  commentaries: CommentaryResponse[];
}
