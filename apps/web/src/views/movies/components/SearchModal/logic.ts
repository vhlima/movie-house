import { useEffect, useState } from 'react';

import type { Dispatch, SetStateAction } from 'react';

import { useLazyQuery } from '@apollo/client';

import type { MovieResponse } from '../../../../types/movie';

import { GET_MOVIE } from '../../../../graphql/movie';

interface MovieSearchModalLogicHandles {
  searchResults: MovieResponse[];
  resetSearchResults: () => void;

  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export const useLogic = (): MovieSearchModalLogicHandles => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [searchResults, setSearchResults] = useState<MovieResponse[]>([]);

  const [getMovie] = useLazyQuery<{ getMovie: MovieResponse }>(GET_MOVIE);

  const resetSearchResults = () => {
    setSearchResults([]);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      if (!searchTerm) return;

      const result = await getMovie({
        variables: { movieId: '1359' },
      });

      if (!result.data) return;

      setSearchResults([result.data.getMovie]);
    };

    const delayDebounceFn = setTimeout(async () => {
      // TODO dont search on first render
      if (searchTerm) {
        await fetchMovie();
      }
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return {
    searchResults,
    resetSearchResults,

    setSearchTerm,
  };
};
