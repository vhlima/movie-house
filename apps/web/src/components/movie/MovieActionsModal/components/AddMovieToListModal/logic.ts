import { useAddMovieToListMutation } from '@/graphql';

export const useLogic = () => {
  const [addMovieToCustomList, addMovieToCustomListResult] =
    useAddMovieToListMutation({
      errorPolicy: 'all',
    });

  async function handleAddMovieToList(listId: string, movieId: number) {
    const { data } = await addMovieToCustomList({
      variables: {
        listId,
        movieId,
      },
    });

    return !data;
  }

  return {
    addMovieToCustomListResult,

    handleAddMovieToList,
  };
};
