import UserResolver from './user/user.resolver';

import MovieResolver from './movie/movie.resolver';

import ReviewResolver from './user/review/review.resolver';

import FavoriteMovieResolver from './user/favorites/favorites.resolver';

import MovieInfoResolver from './user/movieinfo/movieinfo.resolver';

import MovieCreditsResolver from './movie/credits/credits.resolver';

export const userResolver = UserResolver;

export const reviewResolver = ReviewResolver;

export const favoriteMovieResolver = FavoriteMovieResolver;

export const movieResolver = MovieResolver;

export const movieCreditsResolver = MovieCreditsResolver;

export const movieInfoResolver = MovieInfoResolver;
