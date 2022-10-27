import { useFindRecentReviewsQuery } from '../../../../../graphql';

import Link from '../../../../../components/Link';

import Card from '../../../../../components/Card';

import MovieCover from '../../../components/Cover';

import QueryState from '../../../../../components/QueryState';

const RecentReviews: React.FC = () => {
  const { data, loading, error } = useFindRecentReviewsQuery();

  return (
    <Card title="Just reviewed..." noPadding>
      <QueryState loading={loading} error={error}>
        {data && (
          <ul className="grid grid-cols-4 gap-2 w-fit">
            {data.recentReviews.map(review => (
              <li key={`recent-review-${review.id}`}>
                <Link
                  href={{
                    pathname: '/reviews/[id]',
                    query: { id: review.id },
                  }}
                >
                  <MovieCover
                    coverUrl={review.movie.posterUrl}
                    coverSize="auto"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </QueryState>
    </Card>
  );
};

export default RecentReviews;
