import type { GetServerSideProps, NextPage } from 'next';

import * as Yup from 'yup';

import { addApolloState, initializeApollo } from '../../client';

import type {
  FindUserListQuery,
  FindUserListQueryVariables,
  FindUserListMoviesQuery,
  FindUserListMoviesQueryVariables,
} from '../../graphql';

import {
  FindUserListDocument,
  FindUserListMoviesDocument,
} from '../../graphql';

import UserListView from '../../views/lists';

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const requestValidationSchema = Yup.object().shape({
    id: Yup.number().required(),
  });

  try {
    const { id } = await requestValidationSchema.validate(query);

    const apolloClient = initializeApollo();

    const { data: listData } = await apolloClient.query<
      FindUserListQuery,
      FindUserListQueryVariables
    >({
      query: FindUserListDocument,
      variables: { postId: id },
    });

    const { data: listMoviesData } = await apolloClient.query<
      FindUserListMoviesQuery,
      FindUserListMoviesQueryVariables
    >({
      query: FindUserListMoviesDocument,
      variables: {
        listId: listData?.userList?.id,
      },
    });

    return addApolloState(apolloClient, {
      props: {
        ...listData,
        ...listMoviesData,
      },
    });
  } catch (err) {
    req.statusCode = 404;
    return { props: { notFound: true } };
  }
};

const UserListPage: NextPage = () => <UserListView />;

export default UserListPage;
