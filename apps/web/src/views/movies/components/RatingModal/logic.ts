import { useState } from 'react';

import { useMutation } from '@apollo/client';

import type { MovieResponse } from '../../../../types/movie';

import type { UserResponse } from '../../../../types/user';

import { useAuth } from '../../../../hooks/useAuth';

import { ADD_MOVIE_INFO } from '../../../../graphql/user';

// TODO another class requiring movie while it could be gathered via context

interface UserMovieInfoLogicProps {
  movie: MovieResponse;
}

interface UserMovieInfoLogicHandles {
  handleClick: (action: 'watch' | 'like') => void;
}

export const useLogic = ({
  movie,
}: UserMovieInfoLogicProps): UserMovieInfoLogicHandles => {
  const { user, setUser } = useAuth();

  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const [addUserMovieInfo] = useMutation<{ userAddMovieInfo: UserResponse }>(
    ADD_MOVIE_INFO,
  );

  const handleClick = async (action: string) => {
    if (isSubmitting) return;

    const fieldsToUpdate = {};

    const movieInfo = user.moviesInfo.find(mi => mi.movie.id === movie.id);

    switch (action) {
      case 'watch': {
        Object.assign(fieldsToUpdate, {
          watched: !movieInfo ? true : !movieInfo.watched,
        });

        break;
      }

      case 'like': {
        Object.assign(fieldsToUpdate, {
          liked: !movieInfo ? true : !movieInfo.liked,
        });

        break;
      }

      default:
        break;
    }

    if (Object.keys(fieldsToUpdate).length > 0) {
      setSubmitting(true);

      const userResponse = await addUserMovieInfo({
        variables: {
          data: { userId: user._id, movieId: movie.id, ...fieldsToUpdate },
        },
      });

      if (userResponse.data) {
        setUser(userResponse.data.userAddMovieInfo);
      }

      setSubmitting(false);
    }
  };

  return {
    handleClick,
  };
};
