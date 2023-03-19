import { FindReviewsQuery } from '@/graphql';

import { Typography, ListItem } from '@/components';

import Review, { ReviewIntent } from '@/components/review/Review';

interface Props {
  intent?: ReviewIntent;
  reviews: FindReviewsQuery['reviews']['edges'][number]['node'][];
  emptyMessage: string;
}

export const ReviewList: React.FC<Props> = ({
  intent,
  reviews,
  emptyMessage,
}) => {
  const hasAnyReview = reviews.length > 0;

  return !hasAnyReview ? (
    <Typography component="p">{emptyMessage}</Typography>
  ) : (
    <ul>
      {reviews.map(review => (
        <ListItem key={`review-list-${review.id}`}>
          <Review review={review} intent={intent} />
        </ListItem>
      ))}
    </ul>
  );
};
