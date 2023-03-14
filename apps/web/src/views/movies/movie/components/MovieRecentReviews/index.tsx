import { useFindReviewsQuery } from '../../../../../graphql';

import Card from '../../../../../components/Card';

import ReviewPreview from '../../../../../components/review/ReviewPreview';
import Typography from '../../../../../components/Typography';

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
              <ReviewPreview
                key={`movie-recent-review-${edge.node.id}`}
                review={edge.node}
                simple
              />
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  );
};

export default MovieRecentReviews;
