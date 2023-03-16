import { ReviewSortType, useFindReviewsQuery } from '@/graphql';

import { Link, Card, Typography } from '@/components';

import { MovieCover } from '@/components/movie';

const RecentReviews: React.FC = () => {
  const { data } = useFindReviewsQuery({
    variables: {
      page: 1,
      sort: {
        type: ReviewSortType.Recent,
      },
    },
  });

  return (
    <Card>
      <Card.Header title="Just reviewed..." marginBottom />

      <Card.Body>
        {!data ? (
          <Typography component="p">No reviews have been created.</Typography>
        ) : (
          <ul className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {data.reviews.edges.map(edge => (
              <li key={`recent-review-${edge.node.id}`}>
                <Link
                  href={{
                    pathname: '/reviews/[id]',
                    query: { id: edge.node.id },
                  }}
                >
                  <MovieCover movie={edge.node.movie} link={false} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  );
};

export default RecentReviews;
