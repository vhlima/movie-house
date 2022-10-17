import { useRouter } from 'next/router';

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import type {
  UserListCustom,
  FindUserListQuery,
  FindUserListQueryVariables,
} from '../../graphql';

import { FindUserListDocument } from '../../graphql';

import client from '../../api';

import UserListView from '../../views/lists';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params;

  if (id && typeof id === 'string') {
    const { data } = await client.query<
      FindUserListQuery,
      FindUserListQueryVariables
    >({
      query: FindUserListDocument,
      variables: { listId: String(id) },
    });

    return {
      props: {
        ...data,
      } as FindUserListQuery,
    };
  }

  return { props: {} };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

const UserListPage: NextPage<FindUserListQuery> = ({ userListCustom }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <h1>loading</h1>;
  }

  return <UserListView list={userListCustom as UserListCustom} />;
};

export default UserListPage;
