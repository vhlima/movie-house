import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { useRouter } from 'next/router';

import type {
  Review,
  FindReviewQuery,
  FindReviewQueryVariables,
} from '../../graphql';

import { FindReviewDocument } from '../../graphql';

import { initializeApollo } from '../../client';

import MovieReviewView from '../../views/reviews/root';

import MovieInfosSkeleton from '../../components/movie/MovieInfos/Skeleton';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const defaultProps = { props: {} };

  const { id } = params;

  if (!id && typeof id !== 'string') return defaultProps;

  try {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query<
      FindReviewQuery,
      FindReviewQueryVariables
    >({
      query: FindReviewDocument,
      variables: { reviewId: id as string },
    });

    if (!data) return defaultProps;

    return {
      props: {
        review: data.review,
      },
    };
  } catch (err) {
    return defaultProps;
  }

  return defaultProps;
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

const ReviewPage: NextPage<FindReviewQuery> = ({ review }) => {
  const { isFallback, push } = useRouter();

  if (isFallback) {
    return <MovieInfosSkeleton />;
  }

  if (!review) {
    if (typeof window !== 'undefined') {
      push('/404');
    }

    return null;
  }

  return <MovieReviewView review={review as Review} />;
};

export default ReviewPage;
