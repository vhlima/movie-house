import type { NextPage, GetServerSideProps } from 'next';

import * as Yup from 'yup';

import type { FindUserQuery, FindUserListsQuery } from '../../../../graphql';

import { addApolloState, initializeApollo } from '../../../../client';

import { withFetchUserLists } from '../../../../hocs/withFetchUserLists';

import UserListsView from '../../../../views/users/lists';

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context;

  const requestValidationSchema = Yup.object().shape({
    username: Yup.string().required(),
  });

  try {
    const { username } = await requestValidationSchema.validate(query);

    const apolloClient = initializeApollo();

    const fetchResponse = await withFetchUserLists({
      apolloClient,
      username,
    });

    return addApolloState(apolloClient, fetchResponse);
  } catch (err) {
    return { notFound: true };
  }
};

type UserListsPageProps = FindUserQuery & FindUserListsQuery;

const UserListsPage: NextPage<UserListsPageProps> = ({ user, userLists }) => (
  <UserListsView user={user} userLists={userLists} />
);

export default UserListsPage;
