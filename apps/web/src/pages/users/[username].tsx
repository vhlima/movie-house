import type { NextPage, GetServerSideProps } from 'next';

import * as Yup from 'yup';

import type {
  FindUserQuery,
  FindUserQueryVariables,
  FindUserPreMadeListMoviesQuery,
  FindUserPreMadeListMoviesQueryVariables,
  FindUserProfileStatsQuery,
  FindUserProfileStatsQueryVariables,
  FindUserPinnedReviewsQuery,
  FindUserPinnedReviewsQueryVariables,
  FindUserPopularReviewsQuery,
  FindUserPopularReviewsQueryVariables,
  FindUserRecentReviewsQuery,
  FindUserRecentReviewsQueryVariables,
  FindLimitQuery,
  FindLimitQueryVariables,
} from '../../graphql';

import {
  LimitType,
  PreMadeListType,
  FindUserDocument,
  FindLimitDocument,
  FindUserProfileStatsDocument,
  FindUserPreMadeListMoviesDocument,
  FindUserPinnedReviewsDocument,
  FindUserPopularReviewsDocument,
  FindUserRecentReviewsDocument,
} from '../../graphql';

import { addApolloState, initializeApollo } from '../../client';

import UserProfileView from '../../views/users/profile';

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const notFoundProps = { notFound: true };

  const requestValidationSchema = Yup.object().shape({
    username: Yup.string().required().max(25),
  });

  try {
    const { username } = await requestValidationSchema.validate(query);

    const apolloClient = initializeApollo(req.headers);

    const { data: userData } = await apolloClient.query<
      FindUserQuery,
      FindUserQueryVariables
    >({
      query: FindUserDocument,
      variables: { username },
    });

    if (!userData) {
      return notFoundProps;
    }

    const userId = userData.user.id;

    const { data: userPinnedReviewsData } = await apolloClient.query<
      FindUserPinnedReviewsQuery,
      FindUserPinnedReviewsQueryVariables
    >({
      query: FindUserPinnedReviewsDocument,
      variables: { userId },
    });

    const { data: userPopularReviewsData } = await apolloClient.query<
      FindUserPopularReviewsQuery,
      FindUserPopularReviewsQueryVariables
    >({
      query: FindUserPopularReviewsDocument,
      variables: { userId },
    });

    const { data: userRecentReviewsData } = await apolloClient.query<
      FindUserRecentReviewsQuery,
      FindUserRecentReviewsQueryVariables
    >({
      query: FindUserRecentReviewsDocument,
      variables: { userId },
    });

    const { data: profileStatsData } = await apolloClient.query<
      FindUserProfileStatsQuery,
      FindUserProfileStatsQueryVariables
    >({
      query: FindUserProfileStatsDocument,
      variables: { userId },
    });

    const { data: favoriteMoviesData } = await apolloClient.query<
      FindUserPreMadeListMoviesQuery,
      FindUserPreMadeListMoviesQueryVariables
    >({
      query: FindUserPreMadeListMoviesDocument,
      variables: { userId, listType: PreMadeListType.Favorite },
    });

    const { data: limitData } = await apolloClient.query<
      FindLimitQuery,
      FindLimitQueryVariables
    >({
      query: FindLimitDocument,
      variables: { limitType: LimitType.MaxFavoriteMovies },
    });

    return addApolloState(apolloClient, {
      props: {
        ...userData,
        ...limitData,
        ...favoriteMoviesData,
        ...userPopularReviewsData,
        ...userPinnedReviewsData,
        ...userRecentReviewsData,
        ...profileStatsData,
      },
    });
  } catch (err) {
    return notFoundProps;
  }
};

type UserProfilePageProps = FindUserQuery;

const UserProfilePage: NextPage<UserProfilePageProps> = ({ user }) => (
  <UserProfileView user={user} />
);

export default UserProfilePage;
