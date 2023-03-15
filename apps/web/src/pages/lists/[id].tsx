import type { GetServerSideProps, NextPage } from 'next';

import * as Yup from 'yup';

import type {
  FindListQuery,
  FindListQueryVariables,
  FindListMoviesQuery,
  FindListMoviesQueryVariables,
} from '@/graphql';

import { FindListDocument, FindListMoviesDocument } from '@/graphql';
import { addApolloState, initializeApollo } from '../../client';

import UserListView from '../../views/lists';

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const requestValidationSchema = Yup.object().shape({
    id: Yup.string().required(),
  });

  try {
    const { id } = await requestValidationSchema.validate(query);

    const apolloClient = initializeApollo(req.headers);

    const { data: listData } = await apolloClient.query<
      FindListQuery,
      FindListQueryVariables
    >({
      query: FindListDocument,
      variables: { listId: id },
    });

    if (!listData) {
      throw new Error('List data not found');
    }

    const { data: listMoviesData } = await apolloClient.query<
      FindListMoviesQuery,
      FindListMoviesQueryVariables
    >({
      query: FindListMoviesDocument,
      variables: {
        listId: listData.list.id,
        page: 1,
      },
    });

    return addApolloState(apolloClient, {
      props: {
        ...listData,
        ...listMoviesData,
      },
    });
  } catch (err) {
    return { notFound: true };
  }
};

type UserListPageProps = FindListQuery;

const UserListPage: NextPage<UserListPageProps> = ({ ...props }) => (
  <UserListView {...props} />
);

export default UserListPage;
