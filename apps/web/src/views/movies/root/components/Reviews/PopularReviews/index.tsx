import type { Review } from '../../../../../../graphql';

import { useFindMoviePopularReviewsQuery } from '../../../../../../graphql';

import Card from '../../../../../../components/Card';

import ReviewPreview from '../components/ReviewPreview';

import QueryState from '../../../../../../components/QueryState';

interface PopularReviewsProps {
  movieId: number;
}

const PopularReviews: React.FC<PopularReviewsProps> = ({ movieId }) => {
  const { data, error, loading } = useFindMoviePopularReviewsQuery({
    variables: { movieId },
  });

  return (
    <Card title="Popular reviews" link={{ href: '/' }} noPadding>
      <QueryState loading={loading} error={error}>
        {data && (
          <ul>
            {data.moviePopularReviews.map(review => (
              <ReviewPreview
                key={`movie-popular-review-${review.id}`}
                review={review as Review}
              />
            ))}
          </ul>
        )}
      </QueryState>
    </Card>
  );
};

export default PopularReviews;
