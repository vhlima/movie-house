import type { GetServerSideProps, NextPage } from 'next';

import * as Yup from 'yup';

import type { FindReviewQuery, FindReviewQueryVariables } from '@/gql';

import { FindReviewDocument } from '@/gql';

import { addApolloState, initializeApollo } from '@/client';

import MovieReviewView from '@/views/reviews/root';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const requestValidationSchema = Yup.object().shape({
    id: Yup.string().required(),
  });

  try {
    const { id } = await requestValidationSchema.validate(query);

    const apolloClient = initializeApollo();

    const { data: reviewData } = await apolloClient.query<
      FindReviewQuery,
      FindReviewQueryVariables
    >({
      query: FindReviewDocument,
      variables: { reviewId: id },
    });

    return addApolloState(apolloClient, {
      props: {
        ...reviewData,
      },
    });
  } catch (err) {
    return { notFound: true };
  }
};

const ReviewPage: NextPage<FindReviewQuery> = ({ review }) => (
  <MovieReviewView review={review} />
);

export default ReviewPage;
