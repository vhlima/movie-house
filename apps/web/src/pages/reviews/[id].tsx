import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { useRouter } from 'next/router';

import type { ReviewResponse } from '../../types/review';

import { REVIEW } from '../../graphql/review';

import client from '../../api';

import MovieReview from '../../views/reviews/root';

import MovieHeaderSkeleton from '../../views/movies/view/Header/Skeleton';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const defaultProps = { props: { movie: undefined } };

  const { id } = params;

  if (!id) return defaultProps;

  try {
    const { data } = await client.query<{ review: ReviewResponse }>({
      query: REVIEW,
      variables: { reviewId: id },
    });

    if (data) {
      return {
        props: {
          review: data.review,
        },
      };
    }
  } catch (err) {
    console.log(err);
  }

  return defaultProps;
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

const Reviews: NextPage<{ review: ReviewResponse }> = ({ review }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <MovieHeaderSkeleton />;
  }

  if (!review) {
    return <h1>Review not found</h1>;
  }

  return <MovieReview review={review} />;
};

export default Reviews;
