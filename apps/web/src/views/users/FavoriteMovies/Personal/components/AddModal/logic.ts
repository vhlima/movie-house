import { useEffect, useState } from 'react';

import type { Dispatch, SetStateAction } from 'react';

import { useLazyQuery, useMutation } from '@apollo/client';

import type { MovieResponse } from '../../../../../../types/movie';

import type { UserResponse } from '../../../../../../types/user';

import { GET_MOVIE } from '../../../../../../graphql/movie';

import { ADD_FAVORITE_MOVIE } from '../../../../../../graphql/user';

import { useAuth } from '../../../../../../hooks/useAuth';

export interface AddFavoriteMovieModalLogicProps {
  onClose: () => void;
}

interface AddFavoriteMovieModalLogicHandles {
  searchResults: MovieResponse[];
  resetSearchResults: () => void;

  setSearchTerm: Dispatch<SetStateAction<string>>;
  addFavoriteMovie: (movieId: string) => Promise<void>;
}

export const useLogic = ({
  onClose,
}: AddFavoriteMovieModalLogicProps): AddFavoriteMovieModalLogicHandles => {
  const { user, setUser } = useAuth();

  const [searchTerm, setSearchTerm] = useState<string>('');

  const [searchResults, setSearchResults] = useState<MovieResponse[]>([]);

  const [getMovie] = useLazyQuery<{ getMovie: MovieResponse }>(GET_MOVIE);

  const [mutationAddFavoriteMovie] = useMutation<{
    userAddFavoriteMovie: UserResponse;
  }>(ADD_FAVORITE_MOVIE);

  const addFavoriteMovie = async (movieId: string) => {
    const userResponse = await mutationAddFavoriteMovie({
      variables: { userId: user._id, movieId },
    });

    setUser(userResponse.data.userAddFavoriteMovie);

    onClose();
  };

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
        // setSearchResults(movieList);
      }
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return {
    searchResults,
    resetSearchResults,

    setSearchTerm,
    addFavoriteMovie,
  };
};
