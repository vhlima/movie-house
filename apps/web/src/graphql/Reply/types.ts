import type { UserData } from '../User/types';

import CreatedAndUpdatedAt from '../timestamps';

export interface ReplyData extends CreatedAndUpdatedAt {
  id: string;
  postId: string;
  commentaryId: string;
  user: UserData;
  body: string;
  likeCount: number;
}

export interface ReplyResponse {
  replies: ReplyResponse[];
}
