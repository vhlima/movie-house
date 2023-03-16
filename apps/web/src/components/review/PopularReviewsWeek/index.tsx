import { ReviewSortType, useFindReviewsQuery } from '@/graphql';

import { Card } from '@/components';

import { ReviewList } from '../ReviewList';

const PopularReviewsWeek: React.FC = () => {
  const { data } = useFindReviewsQuery({
    variables: {
      page: 1,
      sort: {
        type: ReviewSortType.PopularWeek,
      },
    },
  });

  return (
    <Card>
      <Card.Header title="Popular reviews this week" marginBottom />

      <Card.Body>
        <ReviewList
          reviews={data ? data.reviews.edges.map(edge => edge.node) : []}
          emptyMessage="No reviews were found."
        />
      </Card.Body>
    </Card>
  );
};

export default PopularReviewsWeek;
