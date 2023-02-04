import { ApolloCache } from '@apollo/client';

import type {
  IsMovieOnPreMadeListQuery,
  IsMovieOnPreMadeListQueryVariables,
} from '../../../../graphql';

import {
  PreMadeListType,
  IsMovieOnPreMadeListDocument,
  useAddMovieToPreMadeListMutation,
  useIsMovieOnPreMadeListQuery,
  useRemoveMovieFromPreMadeListMutation,
} from '../../../../graphql';

interface PreMadeListMoviesCacheProps {
  listType: PreMadeListType;
  movieId: number;
}

export function usePreMadeListMoviesCache({
  listType,
  movieId,
}: PreMadeListMoviesCacheProps) {
  const { data: isOnPreMadeListData } = useIsMovieOnPreMadeListQuery({
    variables: { listType, movieId },
  });

  const [addMovieToPreMadeList] = useAddMovieToPreMadeListMutation();

  const [removeMovieFromPreMadeList] = useRemoveMovieFromPreMadeListMutation();

  function updateCache(cache: ApolloCache<unknown>, isAdd: boolean) {
    cache.updateQuery<
      IsMovieOnPreMadeListQuery,
      IsMovieOnPreMadeListQueryVariables
    >(
      {
        query: IsMovieOnPreMadeListDocument,
        variables: {
          listType,
          movieId,
        },
      },
      () => ({
        isMovieOnPreMadeList: isAdd,
      }),
    );
  }

  async function handleAddOrRemoveFromList(movieId: number) {
    if (isOnPreMadeListData && isOnPreMadeListData.isMovieOnPreMadeList) {
      await removeMovieFromPreMadeList({
        variables: { movieId, listType },
        update: (cache, { data }) => {
          if (!data) return;

          updateCache(cache, false);
        },
      });

      return;
    }

    await addMovieToPreMadeList({
      variables: { movieId, listType },
      update: (cache, { data }) => {
        if (!data) return;

        updateCache(cache, true);
      },
    });
  }

  return {
    isAddedToList: isOnPreMadeListData
      ? isOnPreMadeListData.isMovieOnPreMadeList
      : false,
    handleAddOrRemoveFromList,
  };
}
