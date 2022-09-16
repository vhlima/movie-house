import { ApolloError } from "@apollo/client";

import type { 
  FindUserFavoriteMoviesQuery, 
  FindUserFavoriteMoviesQueryVariables 
} from "../../../../../../../graphql";

import { 
  UserListType, 
  FindUserFavoriteMoviesDocument, 
  useFindUserFavoriteMoviesQuery, 
  useRemoveMovieFromPremadeListMutation 
} from "../../../../../../../graphql";

import { useAuth } from "../../../../../../../hooks/useAuth";

type RemoveHandles = (movieId: number) => Promise<void>;

interface EditFavoriteMovieModalLogicHandles {
  data: FindUserFavoriteMoviesQuery;
  error: ApolloError;

  handleRemove: RemoveHandles;
}

export const useLogic = (): EditFavoriteMovieModalLogicHandles => {
  const { user } = useAuth();

  const { data } = useFindUserFavoriteMoviesQuery({ fetchPolicy: 'cache-only', variables: { userId: user.id } });

  const [removeFavoriteMovie, { loading, error }] =
    useRemoveMovieFromPremadeListMutation({
      errorPolicy: 'all',
      update: (cache, { data }, context) => {
        if (!data) return;

        cache.updateQuery<FindUserFavoriteMoviesQuery, FindUserFavoriteMoviesQueryVariables>(
          {
            query: FindUserFavoriteMoviesDocument,
            variables: { userId: user.id }
          },
          cacheData => ({
            favoriteMovies: (cacheData?.favoriteMovies || []).filter(
              favoriteMovie =>
                favoriteMovie.movie.id !== context.variables.movieId,
            ),
          }),
        );
      },
    });

  const handleRemove: RemoveHandles = async (movieId) => {
    if (loading) return;

    await removeFavoriteMovie({
      variables: { listType: UserListType.Favorite, movieId },
    });
  };

  return {
    data,
    error,
    
    handleRemove,
  }
}
