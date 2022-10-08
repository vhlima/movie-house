import type { ModalHandles } from '../../../../../../components/Modal';

import type { AddMovieToCustomListMutationResult } from '../../../../../../graphql';

import { useAddMovieToCustomListMutation } from '../../../../../../graphql';

type AddMovieToListHandles = (listId: string, movieId: number) => Promise<void>;

type AddMovieToListModalLogicProps = ModalHandles;

interface AddMovieToListModalLogicHandles {
  addMovieToCustomListResult: AddMovieToCustomListMutationResult;

  handleAddMovieToList: AddMovieToListHandles;
}

export const useLogic = ({
  onClose,
}: AddMovieToListModalLogicProps): AddMovieToListModalLogicHandles => {
  const [addMovieToCustomList, addMovieToCustomListResult] =
    useAddMovieToCustomListMutation({
      errorPolicy: 'all',
    });

  const handleAddMovieToList: AddMovieToListHandles = async (
    listId,
    movieId,
  ) => {
    const { errors } = await addMovieToCustomList({
      variables: {
        listId,
        movieId,
      },
    });

    if (!errors) {
      onClose();
    }
  };

  return {
    addMovieToCustomListResult,

    handleAddMovieToList,
  };
};
