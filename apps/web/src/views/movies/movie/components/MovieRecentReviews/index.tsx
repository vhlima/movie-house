import { useFindReviewsQuery } from '@/graphql';

import { Typography, Card } from '@/components';

import Review from '@/components/review/Review';

interface MovieRecentReviewsProps {
  movieId: number;
}

const MovieRecentReviews: React.FC<MovieRecentReviewsProps> = ({ movieId }) => {
  const { data: recentReviewsData } = useFindReviewsQuery({
    variables: { page: 1 },
  });

  const hasAnyRecentReview =
    recentReviewsData && recentReviewsData.reviews.edges.length > 0;

  return (
    <Card>
      <Card.Header title="Recent reviews" marginBottom={!hasAnyRecentReview} />

      <Card.Body>
        {!hasAnyRecentReview ? (
          <Typography component="p">
            No one has reviewed this movie yet.
          </Typography>
        ) : (
          <ul>
            {recentReviewsData.reviews.edges.map(edge => (
              <Review
                key={`movie-recent-review-${edge.node.id}`}
                review={edge.node}
                preview={false}
              />
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  );
};

export default MovieRecentReviews;
