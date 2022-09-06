import type { UserData } from '../User/types';

import type Timestamps from '../timestamps';

import Pagination, { PaginationInput } from '../pagination';

export interface FollowResponse {
  follow: boolean;
}

export interface FollowInput {
  userId: string;
}

interface FollowData extends Timestamps {
  id: string;
  user: UserData;
  targetUser: UserData;
}

export interface FindFollowersResponse {
  followers: Pagination<FollowData>;
}

export interface FindFollowingResponse {
  following: Pagination<FollowData>;
}

export interface FindFollowInput extends PaginationInput {
  userId: string;
}

export interface IsFollowingResponse {
  isFollowing: boolean;
}

export interface IsFollowingInput {
  userId: string;
}
