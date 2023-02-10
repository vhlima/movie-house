import type { GetServerSideProps, NextPage } from 'next';

import * as Yup from 'yup';

import type { FindMoviesQuery, FindMoviesQueryVariables } from '../../graphql';

import { MovieSortType, FindMoviesDocument } from '../../graphql';

import { addApolloState, initializeApollo } from '../../client';

import MoviesSortPageView from '../../views/movies/sort';

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

function findSortType(sortType: string) {
  return movieSortTypes.find(type => type.route === sortType.toLowerCase());
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const requestValidationSchema = Yup.object().shape({
    sort: Yup.array()
      .of(Yup.string())
      .min(2)
      .max(2)
      .test('test-sort-params', 'Expected [sortType, sortValue]', value => {
        if (value.length < 2) {
          return false;
        }

        const sortTypeExists = findSortType(value[0]);

        if (!sortTypeExists) {
          return false;
        }

        return true;
      }),
  });

  try {
    const { sort } = await requestValidationSchema.validate(query);

    const { sortType } = findSortType(sort[0]);

    const apolloClient = initializeApollo();

    const { data: moviesData } = await apolloClient.query<
      FindMoviesQuery,
      FindMoviesQueryVariables
    >({
      query: FindMoviesDocument,
      variables: {
        page: 1,
        sort: {
          type: sortType,
          filter: sort[1],
        },
      },
    });
    return addApolloState(apolloClient, {
      props: {
        sortType,
        filter: sort[1],
        ...moviesData,
      },
    });
  } catch (err) {
    return { notFound: true };
  }
};

interface MoviesSortPageProps extends FindMoviesQuery {
  sortType: MovieSortType;
  filter: string;
}

const MoviesSortPage: NextPage<MoviesSortPageProps> = ({ ...props }) => (
  <MoviesSortPageView {...props} />
);

export default MoviesSortPage;
