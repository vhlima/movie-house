import { useFindReviewsQuery } from '@/graphql';

import { Typography, Card } from '@/components';

import { MovieReview } from '../index';

interface MoviePopularReviewsProps {
  movieId: number;
}

export const MoviePopularReviews: React.FC<MoviePopularReviewsProps> = ({
  movieId,
}) => {
  const { data: popularReviewsData } = useFindReviewsQuery({
    variables: { page: 1 },
  });

  const hasAnyPopularReview =
    popularReviewsData && popularReviewsData.reviews.edges.length > 0;

  return (
    <Card>
      <Card.Header title="Popular reviews" marginBottom />

      <Card.Body>
        {!hasAnyPopularReview ? (
          <Typography component="p">
            No one has reviewed this movie yet.
          </Typography>
        ) : (
          <ul>
            {popularReviewsData.reviews.edges.map(edge => (
              <MovieReview
                key={`popular-movie-reviews-${edge.node.id}`}
                review={edge.node}
              />
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  );
};
