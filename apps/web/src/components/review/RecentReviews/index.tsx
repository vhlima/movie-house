import { ReviewSortType, useFindReviewsQuery } from '@/gql';

import { Card } from '@/components';

import { RecentReviewsList } from './components';

const RecentReviews: React.FC = () => {
  const { data } = useFindReviewsQuery({
    variables: {
      page: 1,
      sort: {
        type: ReviewSortType.Recent,
      },
    },
  });

  const reviews = data ? data.reviews.edges.map(edge => edge.node) : [];

  return (
    <Card>
      <Card.Header title="Just reviewed..." marginBottom />

      <Card.Body>
        <RecentReviewsList reviews={reviews} />
      </Card.Body>
    </Card>
  );
};

export default RecentReviews;
