export interface FindUserProfileResponse {
  userProfile: {
    isFollowing: boolean;

    followerCount: number;
    followingCount: number;

    listCount: number;

    moviesWatchedCount: number;
    moviesWatchedThisYearCount: number;
  };
}

export interface FindUserProfileInput {
  userId: string;
}
