import { useFindListMoviesQuery } from '../../../../graphql';

interface ListMoviesLogicProps {
  listId: string;
}

export const useLogic = ({ listId }: ListMoviesLogicProps) => {
  const listMoviesResult = useFindListMoviesQuery({
    variables: {
      listId,
      page: 1,
    },
  });

  return {
    listMoviesResult,
  };
};
