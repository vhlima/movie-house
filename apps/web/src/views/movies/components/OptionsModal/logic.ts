import { ApolloCache } from '@apollo/client';

import { useRouter } from 'next/router';

import {
  Movie,
  FindMovieOptionsQuery,
  FindMovieOptionsQueryResult,
  FindMovieOptionsQueryVariables,
  useRemoveMovieFromPremadeListMutation,
  UserListType,
  FindMovieOptionsDocument,
  useFindMovieOptionsQuery,
  useAddMovieToPremadeListMutation,
} from '../../../../graphql';

import { useAuth } from '../../../../hooks/useAuth';

// TODO another class requiring movie while it could be gathered via context

interface UserRatingLogicProps {
  movie: Movie;
  // TODO maybe only movie id needed here
}

type MovieListActionHandles = (listType: UserListType) => Promise<void>;

interface UserRatingLogicHandles {
  movieOptionsResponse: FindMovieOptionsQueryResult;

  handleAddMovieToList: MovieListActionHandles;
  handleRemoveMovieFromList: MovieListActionHandles;

  redirectToCreateReviewPage: () => Promise<void>;
}

export const useLogic = ({
  movie,
}: UserRatingLogicProps): UserRatingLogicHandles => {
  const { push } = useRouter();

  const { user } = useAuth();

  const movieOptionsResponse = useFindMovieOptionsQuery({
    variables: {
      userId: user.id,
      movieId: movie.id,
      rootId: String(movie.id),
    },
  });

  const [addMovieToPremadeList] = useAddMovieToPremadeListMutation();

  const [removeMovieFromPremadeList] = useRemoveMovieFromPremadeListMutation();

  const updateCache = (
    cache: ApolloCache<any>,
    listType: UserListType,
    condition: boolean,
  ) => {
    cache.updateQuery<FindMovieOptionsQuery, FindMovieOptionsQueryVariables>(
      {
        query: FindMovieOptionsDocument,
        variables: {
          userId: user.id,
          movieId: movie.id,
          rootId: String(movie.id),
        },
      },
      cacheData => {
        if (!cacheData) return cacheData;

        return {
          ...cacheData,
          isOnWatchLater:
            listType === UserListType.WatchLater
              ? condition
              : cacheData.isOnWatchLater,

          isOnWatchList:
            listType === UserListType.Watchlist
              ? condition
              : cacheData.isOnWatchList,
        };
      },
    );
  };

  const handleAddMovieToList: MovieListActionHandles = async listType => {
    await addMovieToPremadeList({
      errorPolicy: 'ignore',
      variables: {
        listType,
        movieId: movie.id,
      },
      update: (cache, { data }) => {
        if (!data) return;

        updateCache(cache, listType, true);
      },
    });
  };

  const handleRemoveMovieFromList: MovieListActionHandles = async listType => {
    await removeMovieFromPremadeList({
      errorPolicy: 'ignore',
      variables: {
        listType,
        movieId: movie.id,
      },
      update: (cache, { data }) => {
        if (!data) return;

        updateCache(cache, listType, false);
      },
    });
  };

  const redirectToCreateReviewPage = async () => {
    await push({
      pathname: '/reviews/create',
      query: { movie: movie.id },
    });
  };

  return {
    movieOptionsResponse,

    handleAddMovieToList,
    handleRemoveMovieFromList,

    redirectToCreateReviewPage,
  };
};
