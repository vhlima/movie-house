import { useFindUserPopularReviewsQuery } from '../../../../../graphql';

import { useProfile } from '../../../hooks/useProfile';

import Card from '../../../../../components/Card';

import Typography from '../../../../../components/Typography';

import ReviewPreview from '../../../../../components/review/ReviewPreview';

const PopularReviews: React.FC = () => {
  const { user } = useProfile();

  const { data: userPopularReviewsData } = useFindUserPopularReviewsQuery({
    variables: { userId: user?.id },
  });

  const hasAnyReview =
    userPopularReviewsData &&
    userPopularReviewsData.reviewsUserPopular.length > 0;

  return (
    <Card>
      <Card.Header title="Popular reviews" />

      <Card.Body>
        {!hasAnyReview ? (
          <Typography component="p">
            {user.username} hasnt reviewed any movies yet.
          </Typography>
        ) : (
          <ul>
            {userPopularReviewsData.reviewsUserPopular.map(review => (
              <ReviewPreview
                key={`popular-review-${review.id}`}
                review={review}
              />
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  );
};

export default PopularReviews;
