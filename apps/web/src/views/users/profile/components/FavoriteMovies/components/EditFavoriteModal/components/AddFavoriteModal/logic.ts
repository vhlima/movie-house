import { ApolloError } from '@apollo/client';

import type { ModalHandles } from '../../../../../../../../../components/Modal';

import type {
  UserListPremadeMovie,
  FindUserFavoriteMoviesQuery,
  FindUserFavoriteMoviesQueryVariables,
} from '../../../../../../../../../graphql';

import {
  UserListType,
  FindUserFavoriteMoviesDocument,
  useAddMovieToPremadeListMutation,
} from '../../../../../../../../../graphql';

import { useAuth } from '../../../../../../../../../hooks/useAuth';

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
  const { user } = useAuth();

  const [addFavoriteMovie, { loading, error, reset }] =
    useAddMovieToPremadeListMutation({
      errorPolicy: 'all',
      update: (cache, { data }) => {
        if (!data) return;

        cache.updateQuery<
          FindUserFavoriteMoviesQuery,
          FindUserFavoriteMoviesQueryVariables
        >(
          {
            query: FindUserFavoriteMoviesDocument,
            variables: { userId: user.id },
          },
          cacheData => ({
            favoriteMovies: [
              ...(cacheData?.favoriteMovies || []),
              data.addMovieToList as UserListPremadeMovie,
            ],
          }),
        );
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
