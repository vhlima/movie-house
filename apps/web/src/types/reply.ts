import type { CommentaryBaseResponse } from './commentary';

export interface ReplyResponse extends CommentaryBaseResponse {
  commentaryId: string;
}

export interface ReplyCacheData {
  replies: ReplyResponse[];
}
