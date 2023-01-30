import { useFindMovieRecentReviewsQuery } from '../../../../../graphql';

import Card from '../../../../../components/Card';

import ReviewBody from '../../../../../components/review/ReviewBody';

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
            <ReviewBody
              key={`movie-recent-review-${review.id}`}
              review={review}
            />
          ))}
        </ul>
      )}
    </Card>
  );
};

export default MovieRecentReviews;
