import { useEffect, useState } from 'react';

import type { MovieSearchResult } from './index';

import { useSearchMovieLazyQuery } from '@/graphql';

export const useLogic = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [searchResults, setSearchResults] = useState<MovieSearchResult[]>([]);

  const [searchMovie, { error }] = useSearchMovieLazyQuery({
    fetchPolicy: 'no-cache',
  });

  function resetSearchResults() {
    setSearchResults([]);
  }

  useEffect(() => {
    const fetchMovie = async () => {
      if (!searchTerm) return;

      const { data, error } = await searchMovie({
        variables: { searchTerm, page: 1 },
      });

      if (!data || error) return;

      setSearchResults(data.searchMovie.edges.map(edge => edge.node));
    };

    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm && searchTerm.length >= 3) {
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
