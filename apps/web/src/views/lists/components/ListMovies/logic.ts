import { useFindUserListMoviesQuery } from '../../../../graphql';

interface ListMoviesLogicProps {
  listId: string;
}

export const useLogic = ({ listId }: ListMoviesLogicProps) => {
  const listMoviesResult = useFindUserListMoviesQuery({
    variables: {
      listId,
    },
  });

  return {
    listMoviesResult,
  };
};
