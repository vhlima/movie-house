import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';

import { useRouter } from 'next/router';

import type {
  User,
  UserListCustom,
  FindUserListsFullQuery,
  FindUserListsFullQueryVariables,
  FindUserQuery,
  FindUserQueryVariables,
  FindUserListCustomMoviesQuery,
  FindUserListCustomMoviesQueryVariables,
} from '../../../graphql';

import {
  FindUserDocument,
  FindUserListsFullDocument,
  FindUserListCustomMoviesDocument,
} from '../../../graphql';

import client from '../../../api';

import UserListsView from '../../../views/users/lists';

export interface UserListsPageProps {
  user: User;
  lists: UserListCustom[];
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { username } = params;

  if (username && typeof username === 'string') {
    // TODO maybe change that to just one query
    const { data: userData, error: userError } = await client.query<
      FindUserQuery,
      FindUserQueryVariables
    >({
      query: FindUserDocument,
      variables: { username },
    });

    const { data: userListsData, error: userListsError } = await client.query<
      FindUserListsFullQuery,
      FindUserListsFullQueryVariables
    >({
      query: FindUserListsFullDocument,
      variables: { userId: userData.user.id },
    });

    if (userData && !userError && userListsData && !userListsError) {
      return {
        props: {
          user: userData.user,
          lists: userListsData.userListsCustom,
        } as UserListsPageProps,
      };
    }
  }

  return { props: {} };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

const UserLists: NextPage<UserListsPageProps> = ({ user, lists }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <h1>loading</h1>;
  }

  return <UserListsView user={user} lists={lists} />;
};

export default UserLists;
