import { useFindRecentReviewsQuery } from '../../../graphql';

import Link from '../../Link';

import Card from '../../Card';

import MovieCover from '../../movie/MovieCover';

import QueryState from '../../QueryState';

const RecentReviews: React.FC = () => {
  const { data, loading, error } = useFindRecentReviewsQuery();

  return (
    <Card>
      <Card.Header title="Just reviewed..." marginBottom />

      <Card.Body>
        <QueryState loading={loading} error={error}>
          {data && (
            <ul className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {data.reviewsRecent.map(review => (
                <li key={`recent-review-${review.id}`}>
                  <Link
                    href={{
                      pathname: '/reviews/[id]',
                      query: { id: review.post.id },
                    }}
                  >
                    <MovieCover movie={review.movie} link={false} />
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
