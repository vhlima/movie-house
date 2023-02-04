import { useFindPopularReviewsFromMovieQuery } from '../../../../../graphql';

import Card from '../../../../../components/Card';

import ReviewPreview from '../../../../../components/review/ReviewPreview';
import Typography from '../../../../../components/Typography';

interface MoviePopularReviewsProps {
  movieId: number;
}

const MoviePopularReviews: React.FC<MoviePopularReviewsProps> = ({
  movieId,
}) => {
  const { data: popularReviewsData } = useFindPopularReviewsFromMovieQuery({
    variables: { movieId },
  });

  const hasAnyPopularReview =
    popularReviewsData && popularReviewsData.reviewsPopularFromMovie.length > 0;

  return (
    <Card title="Popular reviews" noPadding>
      {!hasAnyPopularReview ? (
        <Typography component="p">
          No one has reviewed this movie yet.
        </Typography>
      ) : (
        <ul>
          {popularReviewsData.reviewsPopularFromMovie.map(review => (
            <ReviewPreview
              key={`movie-popular-review-${review.id}`}
              review={review}
              simple
            />
          ))}
        </ul>
      )}
    </Card>
  );
};

export default MoviePopularReviews;
