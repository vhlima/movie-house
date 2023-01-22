import { useFindPopularReviewsFromMovieQuery } from '../../../../../graphql';

import Card from '../../../../../components/Card';

import ReviewBody from '../../../../../components/review/ReviewBody';

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
    <Card title="Popular reviews" link={{ href: '/' }} noPadding>
      {popularReviewsData && (
        <ul>
          {popularReviewsData.reviewsPopularFromMovie.map(review => (
            <ReviewBody
              key={`movie-popular-review-${review.id}`}
              review={review}
            />
          ))}
        </ul>
      )}
    </Card>
  );
};

export default MoviePopularReviews;
