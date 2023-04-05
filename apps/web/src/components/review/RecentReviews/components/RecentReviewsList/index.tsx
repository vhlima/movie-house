import type { FindReviewsQuery } from '@/graphql';

import { Typography } from '@/components';

import { ReviewCoverItem } from '../index';

interface Props {
  reviews: FindReviewsQuery['reviews']['edges'][number]['node'][];
}

export const RecentReviewsList: React.FC<Props> = props => {
  const { reviews } = props;

  if (reviews.length === 0) {
    return <Typography component="p">No reviews have been created.</Typography>;
  }

  return (
    <ul className="grid grid-cols-4 sm:grid-cols-8 gap-2">
      {reviews.map(review => (
        <ReviewCoverItem
          key={`review-cover-${review.id}`}
          id={review.id}
          movie={review.movie}
        />
      ))}
    </ul>
  );
};
