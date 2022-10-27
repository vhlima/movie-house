import { ApolloCache } from '@apollo/client';

import type {
  FindMovieOptionsQuery,
  FindMovieOptionsQueryVariables,
  FindMovieOptionsQueryResult,
} from '../../../../../../graphql';

import {
  UserListType,
  FindMovieOptionsDocument,
  useFindMovieOptionsQuery,
  useAddMovieToPremadeListMutation,
  useRemoveMovieFromPremadeListMutation,
} from '../../../../../../graphql';

import { useAuth } from '../../../../../../hooks/useAuth';

interface InfoButtonsLogicProps {
  movieId: number;
}

type MovieListActionHandles = (listType: UserListType) => Promise<void>;

interface InfoButtonsLogicHandles {
  movieOptionsResponse: FindMovieOptionsQueryResult;

  handleAddOrRemoveMovieFromList: MovieListActionHandles;
}

export const useLogic = ({
  movieId,
}: InfoButtonsLogicProps): InfoButtonsLogicHandles => {
  const { user } = useAuth();

  const movieOptionsResponse = useFindMovieOptionsQuery({
    variables: {
      userId: user.id,
      movieId,
      rootId: String(movieId),
    },
  });

  const [addMovieToPremadeList, addMovieFromListResponse] =
    useAddMovieToPremadeListMutation();

  const [removeMovieFromPremadeList, removeMovieFromListResponse] =
    useRemoveMovieFromPremadeListMutation();

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
          movieId,
          rootId: String(movieId),
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

  const addMovieToList: MovieListActionHandles = async listType => {
    if (addMovieFromListResponse.loading) return;

    await addMovieToPremadeList({
      errorPolicy: 'ignore',
      variables: {
        listType,
        movieId,
      },
      update: (cache, { data }) => {
        if (!data) return;

        updateCache(cache, listType, true);
      },
    });
  };

  const removeMovieFromList: MovieListActionHandles = async listType => {
    if (removeMovieFromListResponse.loading) return;

    await removeMovieFromPremadeList({
      errorPolicy: 'ignore',
      variables: {
        listType,
        movieId,
      },
      update: (cache, { data }) => {
        if (!data) return;

        updateCache(cache, listType, false);
      },
    });
  };

  const handleAddOrRemoveMovieFromList: MovieListActionHandles =
    async listType => {
      if (movieOptionsResponse.loading) return;

      const isRemove =
        listType === UserListType.WatchLater
          ? movieOptionsResponse.data?.isOnWatchLater
          : movieOptionsResponse.data?.isOnWatchList;

      if (!isRemove) {
        await addMovieToList(listType);
      } else {
        await removeMovieFromList(listType);
      }
    };

  return {
    movieOptionsResponse,
    handleAddOrRemoveMovieFromList,
  };
};
