import UserResolver from './user/user.resolver';

import MovieResolver from './movie/movie.resolver';

import ReviewResolver from './review/review.resolver';

import FavoriteMovieResolver from './user/favorites/favorites.resolver';

import MovieCreditsResolver from './movie/credits/credits.resolver';

export const userResolver = UserResolver;

export const reviewResolver = ReviewResolver;

export const favoriteMovieResolver = FavoriteMovieResolver;

export const movieResolver = MovieResolver;

export const movieCreditsResolver = MovieCreditsResolver;
