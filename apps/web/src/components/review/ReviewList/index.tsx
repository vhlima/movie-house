import { FindReviewsQuery } from '@/gql';

import { Typography, ListItem } from '@/components';

import Review from '@/components/review/Review';

interface Props {
  showUser?: boolean;
  reviews: FindReviewsQuery['reviews']['edges'][number]['node'][];
  emptyMessage: string;
}

export const ReviewList: React.FC<Props> = ({
  showUser,
  reviews,
  emptyMessage,
}) => {
  if (reviews.length === 0) {
    return (
      <Typography component="p" data-testid="empty-message">
        {emptyMessage}
      </Typography>
    );
  }

  return (
    <ul data-testid="review-list">
      {reviews.map(review => (
        <ListItem key={`review-list-${review.id}`}>
          <Review review={review} showUser={showUser} />
        </ListItem>
      ))}
    </ul>
  );
};
