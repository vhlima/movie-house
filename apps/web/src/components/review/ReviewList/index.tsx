import { FindReviewsQuery } from '@/graphql';

import { Typography, ListItem } from '@/components';

import Review from '@/components/review/Review';

interface Props {
  reviews: FindReviewsQuery['reviews']['edges'][number]['node'][];
  emptyMessage: string;
}

export const ReviewList: React.FC<Props> = ({ reviews, emptyMessage }) => {
  const hasAnyReview = reviews.length > 0;

  return !hasAnyReview ? (
    <Typography component="p">{emptyMessage}</Typography>
  ) : (
    <ul>
      {reviews.map(review => (
        <ListItem>
          <Review key={`recent-review-${review.id}`} review={review} />
        </ListItem>
      ))}
    </ul>
  );
};
