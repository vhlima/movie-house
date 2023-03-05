import { ReviewSortType, useFindReviewsQuery } from '../../../graphql';

import Card from '../../Card';
import QueryState from '../../QueryState';

import ReviewPreview from '../ReviewPreview';

const PopularReviewsWeek: React.FC = () => {
  const { data, loading, error } = useFindReviewsQuery({
    variables: {
      page: 1,
      sort: {
        type: ReviewSortType.PopularWeek,
      },
    },
  });

  return (
    <Card>
      <Card.Header title="Popular reviews this week" />

      <QueryState loading={loading} error={error}>
        {data && (
          <ul className="flex flex-wrap">
            {data.reviews.edges.map(edge => (
              <ReviewPreview
                key={`popular-review-${edge.node.id}`}
                review={edge.node}
              />
            ))}
          </ul>
        )}
      </QueryState>
    </Card>
  );
};

export default PopularReviewsWeek;
