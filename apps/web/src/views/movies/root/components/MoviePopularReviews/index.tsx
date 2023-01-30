import { useFindPopularReviewsFromMovieQuery } from '../../../../../graphql';

import Card from '../../../../../components/Card';

import ReviewPreview from '../../../../../components/review/ReviewPreview';

interface MoviePopularReviewsProps {
  movieId: number;
}

const MoviePopularReviews: React.FC<MoviePopularReviewsProps> = ({
  movieId,
}) => {
  const { data: popularReviewsData } = useFindPopularReviewsFromMovieQuery({
    variables: { movieId },
  });

  return (
    <Card title="Popular reviews" noPadding>
      {popularReviewsData && (
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
