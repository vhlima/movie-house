import { useState } from 'react';

import { useMutation } from '@apollo/client';

import { useAuth } from '../../../../hooks/useAuth';

import type { UserResponse } from '../../../../types/user';

import type { MovieResponse } from '../../../../types/movie';

import { ADD_MOVIE_INFO } from '../../../../graphql/user';

import InfoButton from './components/InfoButton';

interface UserMovieInfoProps {
  movie: MovieResponse;
}

const UserMovieInfo: React.FC<UserMovieInfoProps> = ({ movie }) => {
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

  const movieInfo = user.moviesInfo.find(mi => mi.movie.id === movie.id);

  return (
    <div className="flex gap-4 text-grey-300">
      <InfoButton
        text="Watch"
        iconType="IoEye"
        iconColor={movieInfo?.watched ? 'green' : undefined}
        onClick={() => handleClick('watch')}
      />

      <InfoButton
        text="Like"
        iconType={movieInfo?.liked ? 'AiFillHeart' : 'AiOutlineHeart'}
        iconColor={movieInfo?.liked ? 'red' : undefined}
        onClick={() => handleClick('like')}
      />

      <InfoButton
        text="Watchlist"
        iconType="AiOutlineClockCircle"
        // iconColor={movieInfo?.watched ? 'blue' : undefined}
        // onClick={() => handleClick('watch')}
      />

      {/* <button className={buttonStyle} type="button">
        <SvgIcon
          className="text-error-dark"
          iconType="AiOutlineHeart"
          size={iconSize}
        />

        <span className={spanStyle}>Like</span>
      </button>

      <button className={buttonStyle} type="button">
        <SvgIcon
          className="text-blue-500"
          iconType="AiOutlineClockCircle"
          size={iconSize}
        />

        <span className={spanStyle}>Watchlist</span>
      </button> */}
    </div>
  );
};

export default UserMovieInfo;
