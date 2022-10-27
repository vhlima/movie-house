import type { Review } from '../../../../../../graphql';

import { useFindMovieRecentReviewsQuery } from '../../../../../../graphql';

import { useMovie } from '../../../hooks/useMovie';

import Card from '../../../../../../components/Card';

import ReviewPreview from '../components/ReviewPreview';

import QueryState from '../../../../../../components/QueryState';

const RecentReviews: React.FC = () => {
  const { movie } = useMovie();

  const { data, error, loading } = useFindMovieRecentReviewsQuery({
    variables: { movieId: movie.id },
  });

  if (!data) {
    return null;
  }

  return (
    <Card title="Recent reviews" link={{ href: '/' }} noPadding>
      <QueryState loading={loading} error={error}>
        {data && (
          <ul>
            {data.movieRecentReviews.map(review => (
              <ReviewPreview
                key={`movie-recent-review-${review.id}`}
                review={review as Review}
              />
            ))}
          </ul>
        )}
      </QueryState>
    </Card>
  );
};

export default RecentReviews;
