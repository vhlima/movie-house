import { MovieResponse } from '../movie';

/* eslint-disable camelcase */

export interface UserResponse {
  _id: string;
  email: string;
  username: string;
  realName: string;
  profilePicture: string;
  followers: string[];
  following: string[];
  favoriteMovies: MovieResponse[];
}
