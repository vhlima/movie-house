import { ApolloError } from '@apollo/client';

import type { ModalHandles } from '../../../../../../../../../components/Modal';

import {
  UserListType,
  useAddMovieToPremadeListMutation,
} from '../../../../../../../../../graphql';

import { useFavoriteMoviesCache } from '../../hooks/useFavoriteMoviesCache';

type AddFavoriteMovieModalLogicProps = ModalHandles;

type HandleAdd = (movieId: number) => Promise<void>;

interface AddFavoriteMovieModalLogicHandles {
  error: ApolloError;
  resetMutation: () => void;

  handleAdd: HandleAdd;
}

export const useLogic = ({
  onClose,
}: AddFavoriteMovieModalLogicProps): AddFavoriteMovieModalLogicHandles => {
  const { updateCache } = useFavoriteMoviesCache();

  const [addFavoriteMovie, { loading, error, reset }] =
    useAddMovieToPremadeListMutation({
      errorPolicy: 'all',
      update: (cache, { data }) => {
        if (!data) return;

        updateCache(cacheData => ({
          userFavoriteMovies: [
            ...(cacheData?.userFavoriteMovies || []),
            data.addMovieToUserList as any,
          ],
        }));
      },
    });

  const handleAdd: HandleAdd = async movieId => {
    if (loading) return;

    const { data, errors } = await addFavoriteMovie({
      variables: { movieId, listType: UserListType.Favorite },
    });

    if (!errors && data) {
      onClose();
    }
  };

  return {
    error,
    resetMutation: reset,

    handleAdd,
  };
};
