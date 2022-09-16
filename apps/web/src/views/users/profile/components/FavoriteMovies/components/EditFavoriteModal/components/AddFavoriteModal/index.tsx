import type { ModalHandles } from '../../../../../../../../../components/Modal';

import type {
  FindUserFavoriteMoviesQuery,
  AddMovieToPremadeListMutationVariables,
} from '../../../../../../../../../graphql';

import {
  UserListType,
  FindUserFavoriteMoviesDocument,
  useAddMovieToPremadeListMutation,
} from '../../../../../../../../../graphql';

import MovieSearchModal from '../../../../../../../../movies/components/SearchModal';

type AddFavoriteMovieModalProps = ModalHandles;

const AddFavoriteMovieModal: React.FC<AddFavoriteMovieModalProps> = ({
  onClose,
}) => {
  const [addFavoriteMovie, { loading, error, reset }] =
    useAddMovieToPremadeListMutation({
      errorPolicy: 'all',
      // update: (cache, { data }) => {
      //   if (!data) return;

      //   cache.updateQuery<FindUserFavoriteMoviesQuery>(
      //     {
      //       query: FindUserFavoriteMoviesDocument,
      //     },
      //     cacheData => ({
      //       favoriteMovies: [
      //         ...(cacheData?.favoriteMovies || []),
      //         data.addMovieToList,
      //       ],
      //     }),
      //   );
      // },
    });

  const handleAdd = async ({
    movieId,
  }: Omit<AddMovieToPremadeListMutationVariables, 'listType'>) => {
    if (loading) return;

    const { data, errors } = await addFavoriteMovie({
      variables: { movieId, listType: UserListType.Favorite },
    });

    if (!errors && data) {
      onClose();
    }
  };

  return (
    <MovieSearchModal
      title="Pick a favorite movie"
      description="Select one of your favorite movies to display on your profile"
      errors={error && [error.message]}
      onSelect={movie => handleAdd({ movieId: movie.id })}
      onFocus={() => reset()}
      onClose={onClose}
    />
  );
};

export default AddFavoriteMovieModal;
