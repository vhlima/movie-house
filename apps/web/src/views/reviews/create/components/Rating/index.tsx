import { useState } from 'react';

import type { Movie } from '../../../../../graphql';

import { useCreateReview } from '../../hooks/useReviewCreate';

import Button from '../../../../../components/Button';

import MovieRatingStar from '../../../../movies/components/RatingStar';

import MovieRateModal from '../../../../movies/components/RatingModal/RateModal';

interface RatingProps {
  movie: Movie;
}

const Rating: React.FC<RatingProps> = ({ movie }) => {
  const { userRating, setUserRating } = useCreateReview();

  const [isRating, setRating] = useState<boolean>(false);

  return (
    <>
      {isRating && (
        <MovieRateModal
          movie={movie}
          onRate={userRating => setUserRating(userRating)}
          onClose={() => setRating(false)}
        />
      )}

      <div className="flex">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
          <MovieRatingStar
            key={n}
            color={userRating >= n ? 'blue' : 'grey'}
            checked={userRating >= n}
          />
        ))}
      </div>

      <Button
        buttonStyle="secondary"
        buttonSize="sm"
        full={false}
        onClick={() => setRating(true)}
      >
        Rate this movie
      </Button>
    </>
  );
};

export default Rating;
