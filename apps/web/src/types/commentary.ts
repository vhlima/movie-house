// todo maybe add these types to a shared package

import type { UserResponse } from './user';

enum CommentaryType {
  ROOT = 'ROOT',
  REPLY = 'REPLY',
}

export interface CommentaryResponse {
  _id: string;
  user: UserResponse;
  body: string;
  referenceId: string;
  commentaryType: CommentaryType;
  likeCount: number;
  repliesCount: number;
}

export interface CommentaryInput {
  body: string;
}
