import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { useRouter } from 'next/router';

import type { ReviewResponse } from '../../graphql/Review/types';

import { FIND_REVIEW } from '../../graphql/Review';

import client from '../../api';

import MovieReviewView from '../../views/reviews/root';

import MovieHeaderSkeleton from '../../views/movies/view/Header/Skeleton';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const defaultProps = { props: {} };

  const { id } = params;

  if (id) {
    try {
      const { data } = await client.query<ReviewResponse>({
        query: FIND_REVIEW,
        variables: { reviewId: id },
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
  }

  return defaultProps;
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

const Reviews: NextPage<ReviewResponse> = ({ review }) => {
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

  return <MovieReviewView review={review} />;
};

export default Reviews;
