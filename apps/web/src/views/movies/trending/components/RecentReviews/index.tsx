import { useFindRecentReviewsQuery } from '../../../../../graphql';

import Link from '../../../../../components/Link';

import Card from '../../../../../components/Card';

import MovieCover from '../../../../../components/movie/MovieCover';

import QueryState from '../../../../../components/QueryState';

const RecentReviews: React.FC = () => {
  const { data, loading, error } = useFindRecentReviewsQuery();

  return (
    <Card title="Just reviewed..." noPadding>
      <QueryState loading={loading} error={error}>
        {data && (
          <ul className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {data.reviewsRecent.map(review => (
              <li key={`recent-review-${review.id}`}>
                <Link
                  href={{
                    pathname: '/reviews/[id]',
                    query: { id: review.id },
                  }}
                >
                  <MovieCover
                    movie={{
                      originalTitle: review.movie.originalTitle,
                      posterUrl: review.movie.posterUrl,
                    }}
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
