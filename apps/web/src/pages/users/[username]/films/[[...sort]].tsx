import type { GetServerSideProps, NextPage } from 'next';

import * as Yup from 'yup';

import type {
  MovieReferenceSortInput,
  FindUserQuery,
  FindUserQueryVariables,
  FindPreMadeListMoviesQuery,
  FindPreMadeListMoviesQueryVariables,
} from '../../../../graphql';

import {
  MovieReferenceSortType,
  PreMadeListType,
  FindUserDocument,
  FindPreMadeListMoviesDocument,
} from '../../../../graphql';

import { addApolloState, initializeApollo } from '../../../../client';

import YearNavigation from '../../../../components/Sort/YearNavigation';

import UserMovieListView from '../../../../views/users/movies';

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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const requestValidationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
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
    const { username, sort } = await requestValidationSchema.validate(query);

    const apolloClient = initializeApollo();

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

    const sortInput: MovieReferenceSortInput | null =
      sort && sort.length > 0
        ? {
            type: findSortType(sort[0]).sortType,
            filter: sort[1],
          }
        : null;

    const { data: moviesData } = await apolloClient.query<
      FindPreMadeListMoviesQuery,
      FindPreMadeListMoviesQueryVariables
    >({
      query: FindPreMadeListMoviesDocument,
      variables: {
        userId: userData.user.id,
        listType: PreMadeListType.Watched,
        page: 1,
        sort: sortInput,
      },
    });

    return addApolloState(apolloClient, {
      props: {
        sort: sortInput,
        ...userData,
        ...moviesData,
      },
    });
  } catch (err) {
    return { notFound: true };
  }
};

interface UserWatchedMoviesPageProps
  extends FindUserQuery,
    FindPreMadeListMoviesQuery {
  sort?: MovieReferenceSortInput;
}

const UserWatchedMoviesPage: NextPage<UserWatchedMoviesPageProps> = ({
  user,
  sort,
  preMadeListMovies,
  ...props
}) => {
  const useYearNavigation = sort
    ? sort.type === MovieReferenceSortType.Decade ||
      sort.type === MovieReferenceSortType.Year
    : false;

  return (
    <UserMovieListView user={user} movies={preMadeListMovies} {...props}>
      {useYearNavigation && (
        <YearNavigation
          year={parseInt(sort.filter, 10)}
          isDecade={sort.type === MovieReferenceSortType.Decade}
          path={{
            pathname: `/users/[username]/watchlist`,
            query: {
              username: user.username,
            },
          }}
        />
      )}
    </UserMovieListView>
  );
};

export default UserWatchedMoviesPage;
