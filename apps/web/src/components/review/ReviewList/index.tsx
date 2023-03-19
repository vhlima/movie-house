import { FindReviewsQuery } from '@/graphql';

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
  const hasAnyReview = reviews.length > 0;

  return !hasAnyReview ? (
    <Typography component="p">{emptyMessage}</Typography>
  ) : (
    <ul>
      {reviews.map(review => (
        <ListItem key={`review-list-${review.id}`}>
          <Review review={review} showUser={showUser} />
        </ListItem>
      ))}
    </ul>
  );
};
