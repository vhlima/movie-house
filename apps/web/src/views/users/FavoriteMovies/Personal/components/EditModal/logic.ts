import { useState } from 'react';

import type { Dispatch, SetStateAction } from 'react';

import { useMutation } from '@apollo/client';

import type { UserResponse } from '../../../../../../types/user';

import {
  ADD_FAVORITE_MOVIE,
  REMOVE_FAVORITE_MOVIE,
} from '../../../../../../graphql/user';

import { useAuth } from '../../../../../../hooks/useAuth';

interface EditModalLogicProps {
  maxFavorite: number;
}

interface EditModalLogicHandles {
  isAdding: boolean;
  setAdding: Dispatch<SetStateAction<boolean>>;

  freeSlots: number[];

  addFavoriteMovie: (movieId: string) => Promise<void>;
  removeFavoriteMovie: (movieId: string) => Promise<void>;
}

export const useLogic = ({
  maxFavorite,
}: EditModalLogicProps): EditModalLogicHandles => {
  const { user, setUser } = useAuth();

  const [isAdding, setAdding] = useState<boolean>(false);

  const [mutationAddFavoriteMovie] = useMutation<{
    userAddFavoriteMovie: UserResponse;
  }>(ADD_FAVORITE_MOVIE);

  const [mutationRemoveFavoriteMovie] = useMutation<{
    userRemoveFavoriteMovie: UserResponse;
  }>(REMOVE_FAVORITE_MOVIE);

  const addFavoriteMovie = async (movieId: string) => {
    const userResponse = await mutationAddFavoriteMovie({
      variables: { userId: user._id, movieId },
    });

    setUser(userResponse.data.userAddFavoriteMovie);

    setAdding(false);
  };

  const removeFavoriteMovie = async (movieId: string) => {
    const userResponse = await mutationRemoveFavoriteMovie({
      variables: { userId: user._id, movieId },
    });

    setUser(userResponse.data.userRemoveFavoriteMovie);
  };

  const freeSlots = Array.from(
    {
      length: maxFavorite - user.favoriteMovies.length - 1,
    },
    (v, k) => k,
  );

  return {
    freeSlots,

    isAdding,
    setAdding,

    addFavoriteMovie,
    removeFavoriteMovie,
  };
};
