import type { MovieData } from '../Movie/types';

import CreatedAndUpdatedAt from '../timestamps';

export interface UserRatings {
  movie: MovieData;
  rating: number;
  liked: boolean;
  watched: boolean;
}

export interface UserData extends CreatedAndUpdatedAt {
  id: string;
  username: string;
  email: string;
  realName: string;
  biography: string;
  profilePictureUrl: string;
}
