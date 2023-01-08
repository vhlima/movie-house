import { useState } from 'react';

import type { Movie } from '../../../../../graphql';

import { useCreateReview } from '../../hooks/useReviewCreate';

import Button from '../../../../../components/Button';

import StarIcon from '../../../../../components/StarIcon';

import MovieRateModal from '../../../../../components/movie/MovieRateModal';

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
          movie={{
            originalTitle: movie.originalTitle,
          }}
          onRate={userRating => setUserRating(userRating)}
          onClose={() => setRating(false)}
        />
      )}

      <div className="flex">
        {Array.from({ length: 10 })
          .map((_, index) => index + 1)
          .map(n => (
            <StarIcon key={`review-rating-star-${n}`} fill={userRating >= n} />
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
