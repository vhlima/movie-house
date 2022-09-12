export interface FindUserProfileResponse {
  userProfile: {
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
