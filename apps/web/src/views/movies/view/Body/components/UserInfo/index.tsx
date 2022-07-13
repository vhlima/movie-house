import { useMemo, useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { useAuth } from '../../../../../../hooks/useAuth';

import type { MovieResponse } from '../../../../../../types/movie';

import { useLogic } from './logic';

import MovieRatingModal from '../../../../components/RatingModal';

import InfoButton from './components/InfoButton';

interface UserMovieInfoProps {
  movie: MovieResponse;
}

const UserMovieInfo: React.FC<UserMovieInfoProps> = ({ movie }) => {
  const { user } = useAuth();

  // TODO prop drilling

  const { handleClick } = useLogic({ movie });

  const [isRating, setRating] = useState<boolean>(false);

  const movieInfo = useMemo(
    () => user.moviesInfo.find(mi => mi.movie.id === movie.id),
    [user, movie],
  );

  return (
    <>
      <AnimatePresence>
        {isRating && movieInfo && (
          <MovieRatingModal
            movie={movieInfo.movie}
            onClose={() => setRating(false)}
          />
        )}
      </AnimatePresence>

      <div className="flex gap-4 text-grey-300">
        <InfoButton
          text="Rate"
          iconType={movieInfo?.rating > 0 ? 'AiFillStar' : 'AiOutlineStar'}
          iconColor={movieInfo?.rating > 0 ? 'blue' : undefined}
          onClick={() => setRating(true)}
        />

        <InfoButton
          text="Watch"
          iconType={movieInfo?.watched ? 'IoEye' : 'IoEyeOutline'}
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
      </div>
    </>
  );
};

export default UserMovieInfo;
