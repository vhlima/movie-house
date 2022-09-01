import { createContext, useContext, useMemo, useState } from 'react';

import type { PropsWithChildren, Dispatch, SetStateAction } from 'react';

import type { MovieData } from '../../../../graphql/Movie/types';

interface CreateReviewContextData {
  selectedMovie?: MovieData;
  setSelectedMovie: Dispatch<SetStateAction<MovieData>>;

  userRating: number;
  setUserRating: Dispatch<SetStateAction<number>>;
}

interface CreateReviewProps {
  paramsMovie?: MovieData;
}

const CreateReviewContext = createContext({} as CreateReviewContextData);

export const CreateReviewProvider: React.FC<
  PropsWithChildren<CreateReviewProps>
> = ({ paramsMovie, children }) => {
  const [selectedMovie, setSelectedMovie] = useState<MovieData>(paramsMovie);

  const [userRating, setUserRating] = useState<number>(0);

  const value = useMemo(
    () =>
      ({
        selectedMovie,
        setSelectedMovie,

        userRating,
        setUserRating,
      } as CreateReviewContextData),
    [selectedMovie, setSelectedMovie, userRating, setUserRating],
  );

  return (
    <CreateReviewContext.Provider value={value}>
      {children}
    </CreateReviewContext.Provider>
  );
};

export function useCreateReview(): CreateReviewContextData {
  const context = useContext(CreateReviewContext);

  if (!context) {
    throw new Error(
      'useCreateReview must be used within an CreateReviewProvider',
    );
  }

  return context;
}
