import { useFindMovieRecentReviewsQuery } from '../../../../../graphql';

import Card from '../../../../../components/Card';

import ReviewPreview from '../../../../../components/review/ReviewPreview';
import Typography from '../../../../../components/Typography';

interface MovieRecentReviewsProps {
  movieId: number;
}

const MovieRecentReviews: React.FC<MovieRecentReviewsProps> = ({ movieId }) => {
  const { data: recentReviewsData } = useFindMovieRecentReviewsQuery({
    variables: { movieId },
  });

  const hasAnyRecentReview =
    recentReviewsData && recentReviewsData.reviewsRecentFromMovie.length > 0;

  return (
    <Card title="Recent reviews" noPadding>
      {!hasAnyRecentReview ? (
        <Typography component="p">
          No one has reviewed this movie yet.
        </Typography>
      ) : (
        <ul>
          {recentReviewsData.reviewsRecentFromMovie.map(review => (
            <ReviewPreview
              key={`movie-recent-review-${review.id}`}
              review={review}
              simple
            />
          ))}
        </ul>
      )}
    </Card>
  );
};

export default MovieRecentReviews;
