import type { NextPage, GetServerSideProps } from 'next';

import * as Yup from 'yup';

import type {
  FindUserQuery,
  FindUserQueryVariables,
  FindUserFavoriteMoviesQuery,
  FindUserFavoriteMoviesQueryVariables,
  FindUserProfileStatsQuery,
  FindUserProfileStatsQueryVariables,
  FindUserProfileFeaturedReviewsQuery,
  FindUserProfileFeaturedReviewsQueryVariables,
} from '../../graphql';

import {
  FindUserDocument,
  FindUserProfileStatsDocument,
  FindUserFavoriteMoviesDocument,
  FindUserProfileFeaturedReviewsDocument,
} from '../../graphql';

import { addApolloState, initializeApollo } from '../../client';

import UserProfileView from '../../views/users/profile';

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

    const {
      data: { user },
    } = await apolloClient.query<FindUserQuery, FindUserQueryVariables>({
      query: FindUserDocument,
      variables: { username: username as string },
    });

    if (!user) {
      res.statusCode = 404;
      return { props: {} };
    }

    await apolloClient.query<
      FindUserProfileFeaturedReviewsQuery,
      FindUserProfileFeaturedReviewsQueryVariables
    >({
      query: FindUserProfileFeaturedReviewsDocument,
      variables: { userId: user.id },
    });

    await apolloClient.query<
      FindUserProfileStatsQuery,
      FindUserProfileStatsQueryVariables
    >({
      query: FindUserProfileStatsDocument,
      variables: { userId: user.id },
    });

    await apolloClient.query<
      FindUserFavoriteMoviesQuery,
      FindUserFavoriteMoviesQueryVariables
    >({
      query: FindUserFavoriteMoviesDocument,
      variables: { userId: user.id },
    });

    return addApolloState(apolloClient, {
      props: {},
    });
  } catch (err) {
    res.statusCode = 404;
    return { props: {} };
  }
};

const UserProfile: NextPage = () => <UserProfileView />;

export default UserProfile;
