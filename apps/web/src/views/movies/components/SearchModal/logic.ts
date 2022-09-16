import { useEffect, useState } from 'react';

import type { Dispatch, SetStateAction } from 'react';

import { ApolloError } from '@apollo/client';

import type { Movie } from '../../../../graphql';

import { useSearchMovieLazyQuery } from '../../../../graphql';

interface MovieSearchModalLogicHandles {
  searchResults: Movie[];
  error: ApolloError;

  resetSearchResults: () => void;

  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export const useLogic = (): MovieSearchModalLogicHandles => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const [searchMovie, { error }] = useSearchMovieLazyQuery({
    fetchPolicy: 'no-cache',
  });

  const resetSearchResults = () => {
    setSearchResults([]);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      if (!searchTerm) return;

      const { data, error } = await searchMovie({
        variables: { searchTerm },
      });

      if (!data || error) return;

      setSearchResults(data.searchMovie.results as Movie[]);
    };

    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm && searchTerm.length >= 4) {
        await fetchMovie();
      }
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return {
    searchResults,
    error,
    resetSearchResults,

    setSearchTerm,
  };
};
