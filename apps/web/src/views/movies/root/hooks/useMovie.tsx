import { createContext, useContext } from 'react';

import type { Movie } from '../../../../graphql';

export interface MovieContextData {
  movie: Movie;
}

export const MovieContext = createContext<MovieContextData>(
  {} as MovieContextData,
);

export function useMovie(): MovieContextData {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error('useMovie must be used within an provider');
  }

  return context;
}
