import { useFindReviewsQuery } from '@/graphql';

import { Typography, Card } from '@/components';

import { MovieReview } from '../index';

interface Props {
  movieId: number;
}

export const MovieRecentReviews: React.FC<Props> = ({ movieId }) => {
  const { data: recentReviewsData } = useFindReviewsQuery({
    variables: { page: 1 },
  });

  const hasAnyRecentReview =
    recentReviewsData && recentReviewsData.reviews.edges.length > 0;

  return (
    <Card>
      <Card.Header title="Recent reviews" marginBottom />

      <Card.Body>
        {!hasAnyRecentReview ? (
          <Typography component="p">
            No one has reviewed this movie yet.
          </Typography>
        ) : (
          <ul>
            {recentReviewsData.reviews.edges.map(edge => (
              <MovieReview
                key={`recent-reviews-movie-${edge.node.id}`}
                review={edge.node}
              />
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  );
};
