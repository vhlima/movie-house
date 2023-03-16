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
      </Card.Body>
    </Card>
  );
};

export default RecentReviews;
