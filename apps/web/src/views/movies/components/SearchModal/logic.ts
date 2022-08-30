import { useEffect, useState } from 'react';

import type { Dispatch, SetStateAction } from 'react';

import { ApolloError, useLazyQuery } from '@apollo/client';

import type {
  MovieData,
  MovieSearchInput,
  MovieSearchResponse,
} from '../../../../graphql/Movie/types';

import { SEARCH_MOVIE } from '../../../../graphql/Movie';

interface MovieSearchModalLogicHandles {
  searchResults: MovieData[];
  error: ApolloError;

  resetSearchResults: () => void;

  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export const useLogic = (): MovieSearchModalLogicHandles => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [searchResults, setSearchResults] = useState<MovieData[]>([]);

  const [searchMovie, { error }] = useLazyQuery<
    MovieSearchResponse,
    MovieSearchInput
  >(SEARCH_MOVIE);

  const resetSearchResults = () => {
    setSearchResults([]);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      if (!searchTerm) return;

      try {
        const { data } = await searchMovie({
          variables: { searchTerm },
        });

        if (!data) return;

        setSearchResults(data.searchMovie.results);
      } catch (err) {
        console.error(err);
      }
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
