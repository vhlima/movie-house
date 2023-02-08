import type { Review } from '../../../graphql';

import { useFindPopularReviewsWeekQuery } from '../../../graphql';

import Card from '../../Card';
import QueryState from '../../QueryState';

import ReviewPreview from '../ReviewPreview';

const PopularReviewsWeek: React.FC = () => {
  const { data, loading, error } = useFindPopularReviewsWeekQuery();

  return (
    <Card>
      <Card.Header title="Popular reviews this week" />

      <QueryState loading={loading} error={error}>
        {data && (
          <ul className="flex flex-wrap">
            {data.reviewsPopularWeek.map(review => (
              <ReviewPreview
                key={`popular-review-${review.id}`}
                review={review as Review}
              />
            ))}
          </ul>
        )}
      </QueryState>
    </Card>
  );
};

export default PopularReviewsWeek;
