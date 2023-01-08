import type { Review } from '../../../../../graphql';

import { useFindPopularReviewsWeekQuery } from '../../../../../graphql';

import Card from '../../../../../components/Card';

import QueryState from '../../../../../components/QueryState';

import ReviewPreview from '../../../../../components/review/ReviewPreview';

const PopularReviews: React.FC = () => {
  const { data, loading, error } = useFindPopularReviewsWeekQuery();

  return (
    <Card title="Popular reviews this week" noPadding>
      <QueryState loading={loading} error={error}>
        {data && (
          <ul className="flex flex-wrap">
            {data.popularReviewsWeek.map(review => (
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

export default PopularReviews;
