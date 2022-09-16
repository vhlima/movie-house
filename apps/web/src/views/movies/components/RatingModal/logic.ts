import type { Movie } from '../../../../graphql';

import { useAuth } from '../../../../hooks/useAuth';

// import {
//   ADD_MOVIE_TO_WATCHLIST,
//   RATE_MOVIE,
//   REMOVE_MOVIE_FROM_WATCHLIST,
// } from '../../../.;

// TODO maybe use only one rating mutation for both rating types

// TODO another class requiring movie while it could be gathered via context

interface UserRatingLogicProps {
  movie: Movie;
}

interface UserRatingLogicHandles {
  handleWatchlist: () => Promise<void>;
  handleClick: (action: 'watch' | 'like') => Promise<void>;
}

export const useLogic = ({ movie }: UserRatingLogicProps) => {
  const { user } = useAuth();

  // const [addUserRating] = useMutation<{ userAddRate: UserResponse }>(
  //   RATE_MOVIE,
  // );

  // // TODO change this method to ADD or REMOVE from watchlist

  // const [addToWatchlist] = useMutation<{ addMovieToWatchlist: UserResponse }>(
  //   ADD_MOVIE_TO_WATCHLIST,
  // );

  // const [removeFromWatchlist] = useMutation<{
  //   removeMovieFromWatchlist: UserResponse;
  // }>(REMOVE_MOVIE_FROM_WATCHLIST);

  // const handleWatchlist = async () => {
  //   const movieExists = user.watchlist.find(m => m.id === movie.id);

  //   const variables = {
  //     userId: user._id,
  //     movieId: movie.id,
  //   };

  //   if (movieExists) {
  //     const { data } = await removeFromWatchlist({
  //       variables,
  //     });

  //     if (data) {
  //       setUser(data.removeMovieFromWatchlist);
  //     }

  //     return;
  //   }

  //   const { data } = await addToWatchlist({
  //     variables,
  //   });

  //   if (data) {
  //     setUser(data.addMovieToWatchlist);
  //   }
  // };

  // const handleClick = async (action: string) => {
  //   const ratingInfo = user.ratings.find(r => r.movie.id === movie.id);

  //   const fieldsToUpdate = {};

  //   switch (action) {
  //     case 'watch': {
  //       Object.assign(fieldsToUpdate, {
  //         watched: !ratingInfo ? true : !ratingInfo.watched,
  //       });

  //       break;
  //     }

  //     case 'like': {
  //       Object.assign(fieldsToUpdate, {
  //         liked: !ratingInfo ? true : !ratingInfo.liked,
  //       });

  //       break;
  //     }

  //     default:
  //       break;
  //   }

  //   if (Object.keys(fieldsToUpdate).length > 0) {
  //     const { data } = await addUserRating({
  //       variables: {
  //         userId: user._id,
  //         movieId: movie.id,
  //         data: fieldsToUpdate,
  //       },
  //     });

  //     if (data) {
  //       setUser(data.userAddRate);
  //     }
  //   }
  // };

  // return {
  //   handleWatchlist,
  //   handleClick,
  // };
};
