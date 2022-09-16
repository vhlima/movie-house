import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { useRouter } from 'next/router';

import type {
  Review,
  FindReviewQuery,
  FindReviewQueryVariables,
} from '../../graphql';

import { FindReviewDocument } from '../../graphql';

import client from '../../api';

import MovieReviewView from '../../views/reviews/root';

import MovieHeaderSkeleton from '../../views/movies/view/Header/Skeleton';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const defaultProps = { props: {} };

  const { id } = params;

  if (!id && typeof id !== 'string') return defaultProps;

  try {
    const { data } = await client.query<
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
    return <MovieHeaderSkeleton />;
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
