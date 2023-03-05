import type { NextPage, GetServerSideProps } from 'next';

import * as Yup from 'yup';

import type { FindUserQuery, FindListsQuery } from '../../../../../graphql';

import { ListSortType } from '../../../../../graphql';

import { addApolloState, initializeApollo } from '../../../../../client';

import { withFetchUserLists } from '../../../../../hocs/withFetchUserLists';

import UserListsView from '../../../../../views/users/lists';

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context;

  const requestValidationSchema = Yup.object().shape({
    username: Yup.string().required(),
    sortType: Yup.string()
      .oneOf(
        Object.values(ListSortType).map(value =>
          value.toString().toLowerCase(),
        ),
      )
      .required(),
  });

  try {
    const { username, sortType } = await requestValidationSchema.validate(
      query,
    );

    const apolloClient = initializeApollo();

    const sortTypeFormatted = `${sortType[0].toUpperCase()}${sortType.substring(
      1,
      sortType.length,
    )}`;

    const listSortType = ListSortType[sortTypeFormatted];

    const fetchResponse = await withFetchUserLists({
      apolloClient,
      username,
      sort: listSortType
        ? {
            type: listSortType,
          }
        : undefined,
    });

    return addApolloState(apolloClient, fetchResponse);
  } catch (err) {
    return { notFound: true };
  }
};

type UserListsSortPageProps = FindUserQuery & FindListsQuery;

const UserListsSortPage: NextPage<UserListsSortPageProps> = ({
  user,
  lists,
}) => <UserListsView user={user} lists={lists} />;

export default UserListsSortPage;
