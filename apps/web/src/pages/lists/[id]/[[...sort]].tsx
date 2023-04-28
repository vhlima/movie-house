import type { GetServerSideProps, NextPage } from 'next';

import * as Yup from 'yup';

import type {
  FindListQuery,
  FindListQueryVariables,
  FindListMoviesQuery,
  FindListMoviesQueryVariables,
  MovieReferenceSortInput,
} from '@/gql';

import {
  MovieReferenceSortType,
  FindListDocument,
  FindListMoviesDocument,
} from '@/gql';

import UserListView from '@/views/lists';

import { addApolloState, initializeApollo } from '@/client';

const movieReferenceSortTypes = [
  {
    route: 'decade',
    sortType: MovieReferenceSortType.Decade,
  },
  {
    route: 'genre',
    sortType: MovieReferenceSortType.Genre,
  },
  {
    route: 'release',
    sortType: MovieReferenceSortType.ReleaseRecent,
  },
  {
    route: 'year',
    sortType: MovieReferenceSortType.Year,
  },
] as Array<{ route: string; sortType: MovieReferenceSortType }>;

function findSortType(route: string) {
  return movieReferenceSortTypes.find(
    type => type.route === route.toLowerCase(),
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const requestValidationSchema = Yup.object().shape({
    id: Yup.string().required(),
    page: Yup.number().min(1).max(100),
    sort: Yup.array()
      .notRequired()
      .of(Yup.string())
      .min(2)
      .max(2)
      .test('test-sort-params', 'Expected [sortType, sortValue]', value =>
        !value || value.length < 2 ? true : !!findSortType(value[0]),
      ),
  });

  try {
    const { id, page, sort } = await requestValidationSchema.validate(query);

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

    const sortInput: MovieReferenceSortInput | null =
      sort && sort.length > 0
        ? {
            type: findSortType(sort[0]).sortType,
            filter: sort[1],
          }
        : null;

    const { data: listMoviesData } = await apolloClient.query<
      FindListMoviesQuery,
      FindListMoviesQueryVariables
    >({
      query: FindListMoviesDocument,
      variables: {
        listId: listData.list.id,
        page: page || 1,
        sort: sortInput,
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

type UserListPageProps = FindListQuery & FindListMoviesQuery;

const UserListPage: NextPage<UserListPageProps> = ({ ...props }) => (
  <UserListView {...props} />
);

export default UserListPage;
