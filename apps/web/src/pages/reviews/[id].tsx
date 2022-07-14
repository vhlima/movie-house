import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import type { ReviewResponse } from '../../types/user';

import { REVIEW } from '../../graphql/review';

import client from '../../api';

import MovieHeader from '../../views/movies/view/Header';

import UserMovieReview from '../../views/users/reviews';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const defaultProps = { props: { movie: undefined } };

  const { id } = params;

  if (!id) return defaultProps;

  try {
    const reviewResponse = await client.query<{ getReview: ReviewResponse }>({
      query: REVIEW,
      variables: { reviewId: id },
    });

    return {
      props: {
        review: reviewResponse.data.getReview,
      },
    };
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
  if (!review) {
    return <h1>Review not found</h1>;
  }

  return (
    <MovieHeader movie={review.movie}>
      <UserMovieReview review={review} />
    </MovieHeader>
  );
};

export default Reviews;
