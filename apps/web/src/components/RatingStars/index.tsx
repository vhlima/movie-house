import { StarIcon } from '@/components';

interface Props {
  rating: number;
}

const MAX_STARS = 5;

export const RatingStars: React.FC<Props> = props => {
  const { rating } = props;

  const ratingValue = rating > MAX_STARS ? MAX_STARS : rating;

  const fullStars = Math.floor(ratingValue);
  const hasHalfStar = ratingValue % 1 !== 0;
  const emptyStars = MAX_STARS - Math.ceil(ratingValue);

  return (
    <div className="flex" data-testid="rating-stars">
      {Array.from({ length: fullStars })
        .map((_, index) => index)
        .map(rating => (
          <StarIcon intent="full" key={`star-rating-${rating}`} />
        ))}

      {hasHalfStar && <StarIcon intent="half" />}

      {Array.from({ length: emptyStars })
        .map((_, index) => index)
        .map(rating => (
          <StarIcon key={`star-rating-empty-${rating}`} />
        ))}
    </div>
  );
};
