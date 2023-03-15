import { ReviewSortType, useFindReviewsQuery } from '@/graphql';

import { Link, Card } from '@/components';

import MovieCover from '../../movie/MovieCover';

import QueryState from '../../QueryState';

const RecentReviews: React.FC = () => {
  const { data, loading, error } = useFindReviewsQuery({
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
        <QueryState loading={loading} error={error}>
          {data && (
            <ul className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {data.reviews.edges.map(({ node }) => (
                <li key={`recent-review-${node.id}`}>
                  <Link
                    href={{
                      pathname: '/reviews/[id]',
                      query: { id: node.post.id },
                    }}
                  >
                    <MovieCover movie={node.movie} link={false} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </QueryState>
      </Card.Body>
    </Card>
  );
};

export default RecentReviews;
