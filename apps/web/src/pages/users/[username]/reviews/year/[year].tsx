import type { NextPage, GetServerSideProps } from 'next';

import * as Yup from 'yup';

import type {
  FindUserQuery,
  FindUserReviewsQuery,
} from '../../../../../graphql';

import { ReviewSortType } from '../../../../../graphql';

import { addApolloState, initializeApollo } from '../../../../../client';

import { withFetchUserReviews } from '../../../../../hocs/withFetchUserReviews';

import UserReviewsView from '../../../../../views/users/reviews';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const requestValidationSchema = Yup.object().shape({
    username: Yup.string().required(),
    year: Yup.number().required(),
  });

  try {
    const { username, year } = await requestValidationSchema.validate(query);

    const apolloClient = initializeApollo();

    const fetchResponse = await withFetchUserReviews({
      apolloClient,
      username,
      sort: {
        type: ReviewSortType.Year,
        filter: year,
      },
    });

    return addApolloState(apolloClient, fetchResponse);
  } catch (err) {
    return { notFound: true };
  }
};

type PageProps = FindUserQuery & FindUserReviewsQuery;

const UserReviewsYearPage: NextPage<PageProps> = ({ user, reviewsUser }) => (
  <UserReviewsView user={user} reviewsUser={reviewsUser} />
);

export default UserReviewsYearPage;
