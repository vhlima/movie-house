import type { Review } from '../../../../../../../graphql';

import type { CardProps } from '../../../../../../../components/Card';

import { useProfile } from '../../../../hooks/useProfile';

import Card from '../../../../../../../components/Card';

import ReviewPreview from '../../../../../../../components/reviews/Preview';

interface ReviewCardProps extends CardProps {
  reviews?: Review[];
}

const ReviewCard: React.FC<ReviewCardProps> = ({ reviews, ...cardProps }) => {
  const { user } = useProfile();

  return (
    <Card {...cardProps} noPadding>
      {reviews &&
        (reviews.length <= 0 ? (
          <p className="text-grey-200">
            {user?.username} dont have any review to be displayed.
          </p>
        ) : (
          <ul>
            {reviews.map(review => (
              <ReviewPreview key={review.id} review={review} />
            ))}
          </ul>
        ))}
    </Card>
  );
};

export default ReviewCard;
