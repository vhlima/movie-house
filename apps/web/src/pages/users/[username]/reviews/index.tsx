import type { NextPage, GetServerSideProps } from 'next';

import * as Yup from 'yup';

import type {
  FindUserReviewsQuery,
  FindUserReviewsQueryVariables,
  FindUserQuery,
  FindUserQueryVariables,
} from '../../../../graphql';

import { FindUserDocument, FindUserReviewsDocument } from '../../../../graphql';

import { addApolloState, initializeApollo } from '../../../../client';

import UserReviewsView from '../../../../views/users/reviews';

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  const requestValidationSchema = Yup.object().shape({
    username: Yup.string().required(),
  });

  try {
    const { username } = await requestValidationSchema.validate(query);

    const apolloClient = initializeApollo();

    const { data: userData } = await apolloClient.query<
      FindUserQuery,
      FindUserQueryVariables
    >({
      query: FindUserDocument,
      variables: { username },
    });

    if (!userData) {
      res.statusCode = 404;
      return { props: { notFound: true } };
    }

    const { data: userReviewsData } = await apolloClient.query<
      FindUserReviewsQuery,
      FindUserReviewsQueryVariables
    >({
      query: FindUserReviewsDocument,
      variables: { userId: userData.user.id },
    });

    return addApolloState(apolloClient, {
      props: {
        ...userData,
        ...userReviewsData,
      },
    });
  } catch (err) {
    res.statusCode = 404;
    return { props: { notFound: true } };
  }
};

type PageProps = FindUserQuery;

const UserReviewsPage: NextPage<PageProps> = ({ user }) => (
  <UserReviewsView user={user} />
);

export default UserReviewsPage;
