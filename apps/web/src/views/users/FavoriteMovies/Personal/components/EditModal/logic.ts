import { useEffect, useState } from 'react';

import type { Dispatch, SetStateAction } from 'react';

import { MutationResult, useMutation } from '@apollo/client';

import type { UserResponse } from '../../../../../../types/user';

import {
  ADD_FAVORITE_MOVIE,
  REMOVE_FAVORITE_MOVIE,
} from '../../../../../../graphql/user';

import { useAuth } from '../../../../../../hooks/useAuth';

interface EditModalLogicProps {
  maxFavorite: number;
}

interface AddFavoriteResponse {
  addFavoriteMovie: UserResponse;
}

interface RemoveFavoriteResponse {
  removeFavoriteMovie: UserResponse;
}

interface EditModalLogicHandles {
  isAdding: boolean;
  setAdding: Dispatch<SetStateAction<boolean>>;

  freeSlots: number[];

  addFavoriteResult: MutationResult<AddFavoriteResponse>;
  removeFavoriteResult: MutationResult<RemoveFavoriteResponse>;

  clearErrors: () => void;

  addFavoriteMovie: (movieId: string) => Promise<void>;
  removeFavoriteMovie: (movieId: string) => Promise<void>;
}

export const useLogic = ({
  maxFavorite,
}: EditModalLogicProps): EditModalLogicHandles => {
  const { user, setUser } = useAuth();

  const [isAdding, setAdding] = useState<boolean>(false);

  const [mutationAddFavoriteMovie, addFavoriteResult] =
    useMutation<AddFavoriteResponse>(ADD_FAVORITE_MOVIE);

  const [mutationRemoveFavoriteMovie, removeFavoriteResult] =
    useMutation<RemoveFavoriteResponse>(REMOVE_FAVORITE_MOVIE);

  const clearErrors = () => {
    addFavoriteResult.reset();
    removeFavoriteResult.reset();
  };

  const addFavoriteMovie = async (movieId: string) => {
    try {
      const { data } = await mutationAddFavoriteMovie({
        variables: { userId: user._id, movieId },
      });

      if (data) {
        setUser(data.addFavoriteMovie);

        setAdding(false);
      }
    } catch (err) {
      console.error('Unexpected error occurred');
    }
  };

  const removeFavoriteMovie = async (movieId: string) => {
    try {
      const { data } = await mutationRemoveFavoriteMovie({
        variables: { userId: user._id, movieId },
      });

      if (data) {
        setUser(data.removeFavoriteMovie);
      }
    } catch (err) {
      console.error('Unexpected error occurred');
    }
  };

  useEffect(() => {
    if (isAdding) {
      clearErrors();
    }
  }, [isAdding]);

  const freeSlots = Array.from(
    {
      length: maxFavorite - user.favoriteMovies.length - 1,
    },
    (v, k) => k,
  );

  return {
    freeSlots,

    addFavoriteResult,
    removeFavoriteResult,

    clearErrors,

    isAdding,
    setAdding,

    addFavoriteMovie,
    removeFavoriteMovie,
  };
};
