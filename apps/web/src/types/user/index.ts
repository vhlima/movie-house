import type { MovieResponse } from '../movie';

/* eslint-disable camelcase */

export interface ReviewResponse {
  _id: string;
  movie: MovieResponse;
  body: string;
}

export interface ReviewData {
  body: string;
}

export interface UserRatings {
  movie: MovieResponse;
  rating: number;
  liked: boolean;
  watched: boolean;
}

export interface UserResponse {
  _id: string;
  email: string;
  username: string;
  realName: string;
  biography: string;
  profilePicture: string;
  followers: string[];
  following: string[];
  watchlist: MovieResponse[];
  favoriteMovies: MovieResponse[];
  // reviews: ReviewResponse;
  ratings: UserRatings[];
}
