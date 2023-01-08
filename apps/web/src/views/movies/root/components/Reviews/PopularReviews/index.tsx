import type { Review } from '../../../../../../graphql';

import { useFindMoviePopularReviewsQuery } from '../../../../../../graphql';

import { useMovie } from '../../../hooks/useMovie';

import Card from '../../../../../../components/Card';

import ReviewPreview from '../components/ReviewPreview';

import QueryState from '../../../../../../components/QueryState';

const PopularReviews: React.FC = () => {
  const { movie } = useMovie();

  const { data, error, loading } = useFindMoviePopularReviewsQuery({
    variables: { movieId: movie.id },
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
