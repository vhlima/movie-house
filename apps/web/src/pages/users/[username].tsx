import type { NextPage, GetServerSideProps } from 'next';

import * as Yup from 'yup';

import {
  FindUserQuery,
  FindUserQueryVariables,
  FindPreMadeListMoviesQuery,
  FindPreMadeListMoviesQueryVariables,
  FindProfileStatsQuery,
  FindProfileStatsQueryVariables,
  FindReviewsQuery,
  FindReviewsQueryVariables,
  ReviewSortType,
  PreMadeListType,
  FindUserDocument,
  FindProfileStatsDocument,
  FindPreMadeListMoviesDocument,
  FindReviewsDocument,
} from '@/graphql';

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
      throw new Error('User not found');
    }

    const userId = userData.user.id;

    const { data: userPinnedReviewsData } = await apolloClient.query<
      FindReviewsQuery,
      FindReviewsQueryVariables
    >({
      query: FindReviewsDocument,
      variables: {
        userId,
        page: 1,
        sort: {
          type: ReviewSortType.Pinned,
        },
      },
    });

    const { data: userPopularReviewsData } = await apolloClient.query<
      FindReviewsQuery,
      FindReviewsQueryVariables
    >({
      query: FindReviewsDocument,
      variables: {
        userId,
        page: 1,
        sort: {
          type: ReviewSortType.Popular,
        },
      },
    });

    const { data: userRecentReviewsData } = await apolloClient.query<
      FindReviewsQuery,
      FindReviewsQueryVariables
    >({
      query: FindReviewsDocument,
      variables: {
        userId,
        page: 1,
        sort: {
          type: ReviewSortType.Recent,
        },
      },
    });

    const { data: profileStatsData } = await apolloClient.query<
      FindProfileStatsQuery,
      FindProfileStatsQueryVariables
    >({
      query: FindProfileStatsDocument,
      variables: { userId },
    });

    const { data: favoriteMoviesData } = await apolloClient.query<
      FindPreMadeListMoviesQuery,
      FindPreMadeListMoviesQueryVariables
    >({
      query: FindPreMadeListMoviesDocument,
      variables: { userId, listType: PreMadeListType.Favorite, page: 1 },
    });

    return addApolloState(apolloClient, {
      props: {
        ...userData,
        ...favoriteMoviesData,
        ...userPopularReviewsData,
        ...userPinnedReviewsData,
        ...userRecentReviewsData,
        ...profileStatsData,
      },
    });
  } catch (err) {
    console.log(err);
    return notFoundProps;
  }
};

type UserProfilePageProps = FindUserQuery;

const UserProfilePage: NextPage<UserProfilePageProps> = ({ user }) => (
  <UserProfileView user={user} />
);

export default UserProfilePage;
