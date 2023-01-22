import type { GetServerSideProps, NextPage } from 'next';

import { useRouter } from 'next/router';

import * as Yup from 'yup';

import type { FindReviewQuery, FindReviewQueryVariables } from '../../graphql';

import { FindReviewDocument } from '../../graphql';

import { addApolloState, initializeApollo } from '../../client';

import MovieReviewView from '../../views/reviews/root';

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const notFoundProps = { notFound: true };

  const requestValidationSchema = Yup.object().shape({
    id: Yup.number().required().min(0).max(10000),
  });

  try {
    const { id } = await requestValidationSchema.validate(query);

    const apolloClient = initializeApollo();

    const { data: reviewData } = await apolloClient.query<
      FindReviewQuery,
      FindReviewQueryVariables
    >({
      query: FindReviewDocument,
      variables: { postId: id },
    });

    return addApolloState(apolloClient, {
      props: {
        ...reviewData,
      },
    });
  } catch (err) {
    req.statusCode = 404;
    return notFoundProps;
  }
};

const ReviewPage: NextPage<FindReviewQuery> = ({ review }) => (
  <MovieReviewView review={review} />
);

export default ReviewPage;
