import type { GetServerSideProps, NextPage } from 'next';

import * as Yup from 'yup';

import type {
  FindMoviesQuery,
  FindMoviesQueryVariables,
  MovieSortInput,
} from '../../graphql';

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
  {
    route: 'on',
    sortType: MovieSortType.Service,
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

        return !!findSortType(value[0]);
      }),
  });

  try {
    const {
      sort: [sortTypeName, sortFilter],
    } = await requestValidationSchema.validate(query);

    const { sortType } = findSortType(sortTypeName);

    const sortInput: MovieSortInput = {
      type: sortType,
      filter: sortFilter,
    };

    const apolloClient = initializeApollo();

    const { data: moviesData } = await apolloClient.query<
      FindMoviesQuery,
      FindMoviesQueryVariables
    >({
      query: FindMoviesDocument,
      variables: {
        page: 1,
        sort: sortInput,
      },
    });

    return addApolloState(apolloClient, {
      props: {
        sort: sortInput,
        ...moviesData,
      },
    });
  } catch (err) {
    return { notFound: true };
  }
};

interface MoviesSortPageProps extends FindMoviesQuery {
  sort?: MovieSortInput;
}

const MoviesSortPage: NextPage<MoviesSortPageProps> = ({ ...props }) => (
  <MoviesSortPageView {...props} />
);

export default MoviesSortPage;
