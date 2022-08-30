import type { MovieData } from '../Movie/types';

export interface FavoriteMovieData {
  id: string;
  movie: Pick<MovieData, 'id' | 'originalTitle' | 'posterUrl'>;
}

export interface FindFavoriteMoviesResponse {
  favoriteMovies: Array<FavoriteMovieData>;
}

export interface FindFavoriteMoviesInput {
  userId: string;
}

export interface AddFavoriteMovieResponse {
  addFavoriteMovie: FavoriteMovieData;
}

export interface AddFavoriteMovieInput {
  movieId: number;
}

export interface RemoveFavoriteMovieInput {
  movieId: number;
}
