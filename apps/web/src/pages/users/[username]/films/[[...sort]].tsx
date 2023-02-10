import type { GetServerSideProps, NextPage } from 'next';

import * as Yup from 'yup';

import type {
  MovieSortInput,
  FindUserQuery,
  FindUserQueryVariables,
  FindUserPreMadeListMoviesQuery,
  FindUserPreMadeListMoviesQueryVariables,
} from '../../../../graphql';

import {
  MovieSortType,
  PreMadeListType,
  FindUserDocument,
  FindUserPreMadeListMoviesDocument,
} from '../../../../graphql';

import { addApolloState, initializeApollo } from '../../../../client';

import YearNavigation from '../../../../components/Sort/YearNavigation';

import UserMovieListView from '../../../../views/users/movies';

const movieSortTypes = [
  {
    route: 'decade',
    sortType: MovieSortType.Decade,
  },
  {
    route: 'genre',
    sortType: MovieSortType.Genre,
  },
  {
    route: 'release',
    sortType: MovieSortType.ReleaseDateDesc,
  },
  {
    route: 'year',
    sortType: MovieSortType.Year,
  },
] as Array<{ route: string; sortType: MovieSortType }>;

function findSortType(route: string) {
  return movieSortTypes.find(type => type.route === route.toLowerCase());
}

// TODO test sort type on yup

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

    const sortInput: MovieSortInput | null =
      sort && sort.length > 0
        ? {
            type: findSortType(sort[0]).sortType,
            filter: sort[1],
          }
        : null;

    const { data: moviesData } = await apolloClient.query<
      FindUserPreMadeListMoviesQuery,
      FindUserPreMadeListMoviesQueryVariables
    >({
      query: FindUserPreMadeListMoviesDocument,
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
    FindUserPreMadeListMoviesQuery {
  sort?: MovieSortInput;
}

const UserWatchedMoviesPage: NextPage<UserWatchedMoviesPageProps> = ({
  user,
  sort,
  userPreMadeListMovies,
  ...props
}) => {
  const useYearNavigation = sort
    ? sort.type === MovieSortType.Decade || sort.type === MovieSortType.Year
    : false;

  return (
    <UserMovieListView user={user} movies={userPreMadeListMovies} {...props}>
      {useYearNavigation && (
        <YearNavigation
          year={parseInt(sort.filter, 10)}
          isDecade={sort.type === MovieSortType.Decade}
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
