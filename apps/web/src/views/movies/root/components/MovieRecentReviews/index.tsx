import { useFindMovieRecentReviewsQuery } from '../../../../../graphql';

import Card from '../../../../../components/Card';

import ReviewPreview from '../../../../../components/review/ReviewPreview';

interface MovieRecentReviewsProps {
  movieId: number;
}

const MovieRecentReviews: React.FC<MovieRecentReviewsProps> = ({ movieId }) => {
  const { data: recentReviewsData } = useFindMovieRecentReviewsQuery({
    variables: { movieId },
  });

  return (
    <Card title="Recent reviews" noPadding>
      {recentReviewsData && (
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
