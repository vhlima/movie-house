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

interface Review {
  body: string;
}

export interface UserMovieInfo {
  movie: MovieResponse;
  rating: number;
  liked: boolean;
  watched: boolean;
  review?: Review;
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
  favoriteMovies: MovieResponse[];
  // reviews: ReviewResponse;
  moviesInfo: UserMovieInfo[];
}
