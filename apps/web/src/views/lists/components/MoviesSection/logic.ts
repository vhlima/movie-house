import { useState } from 'react';

import type { FindUserListCustomMoviesQueryResult } from '../../../../graphql';

import { useFindUserListCustomMoviesQuery } from '../../../../graphql';

interface MoviesSectionLogicProps {
  listId: string;
}

interface MoviesSectionLogicHandles {
  listMoviesResult: FindUserListCustomMoviesQueryResult;

  currentPage: number;
}

export const useLogic = ({
  listId,
}: MoviesSectionLogicProps): MoviesSectionLogicHandles => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const listMoviesResult = useFindUserListCustomMoviesQuery({
    variables: {
      listId,
      first: 5,
      offset: currentPage > 1 ? currentPage * 5 : null,
    },
  });

  const handleLoadPage = async (page: number) => {
    await listMoviesResult.refetch({
      listId,
      first: 5,
      offset: page * 5,
    });

    setCurrentPage(page);
  };

  return {
    listMoviesResult,

    currentPage,
  };
};
