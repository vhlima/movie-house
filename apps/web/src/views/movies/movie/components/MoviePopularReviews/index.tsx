import { useFindReviewsQuery } from '@/graphql';

import { Typography, Card } from '@/components';

import Review from '@/components/review/Review';

interface MoviePopularReviewsProps {
  movieId: number;
}

const MoviePopularReviews: React.FC<MoviePopularReviewsProps> = ({
  movieId,
}) => {
  const { data: popularReviewsData } = useFindReviewsQuery({
    variables: { page: 1 },
  });

  const hasAnyPopularReview =
    popularReviewsData && popularReviewsData.reviews.edges.length > 0;

  return (
    <Card>
      <Card.Header
        title="Popular reviews"
        marginBottom={!hasAnyPopularReview}
      />

      <Card.Body>
        {!hasAnyPopularReview ? (
          <Typography component="p">
            No one has reviewed this movie yet.
          </Typography>
        ) : (
          <ul>
            {popularReviewsData.reviews.edges.map(edge => (
              <Review
                key={`movie-popular-review-${edge.node.id}`}
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

export default MoviePopularReviews;
