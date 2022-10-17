import { ApolloError } from '@apollo/client';

import type { Review } from '../../../../../../../graphql';

import type { CardProps } from '../../../../../../../components/Card';

import { useProfile } from '../../../../hooks/useProfile';

import Card from '../../../../../../../components/Card';

import QueryState from '../../../../../../../components/QueryState';

import ReviewPreview from '../../../../../../../components/reviews/Preview';

interface ReviewCardProps extends CardProps {
  reviews?: Review[];
  loading?: boolean;
  error?: ApolloError;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  reviews,
  loading,
  error,
  ...cardProps
}) => {
  const { user } = useProfile();

  return (
    <Card {...cardProps} noPadding>
      <QueryState loading={loading} error={error}>
        {!loading &&
          !error &&
          reviews &&
          (reviews.length <= 0 ? (
            <p className="text-grey-200">
              {user.username} dont have any review to be displayed.
            </p>
          ) : (
            <ul>
              {reviews.map(review => (
                <ReviewPreview key={review.id} review={review} />
              ))}
            </ul>
          ))}
      </QueryState>
    </Card>
  );
};

export default ReviewCard;
