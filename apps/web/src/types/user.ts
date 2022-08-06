import type { MovieResponse } from './movie';

import type { ReviewResponse } from './review';

/* eslint-disable camelcase */

export interface UserRatings {
  movie: MovieResponse;
  rating: number;
  liked: boolean;
  watched: boolean;
}

export interface UserResponse {
  _id: string;
  username: string;
  email: string;
  realName: string;
  biography: string;
  profilePicture: string;
  followers: string[];
  following: string[];
  watchlist: MovieResponse[];
  favoriteMovies: MovieResponse[];
  reviews: ReviewResponse[];
  ratings: UserRatings[];
}
