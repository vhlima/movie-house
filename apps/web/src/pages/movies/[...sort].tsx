import type { GetServerSideProps, NextPage } from 'next';

import * as Yup from 'yup';

import type {
  DiscoverMoviesQuery,
  DiscoverMoviesQueryVariables,
  TmDbMovieSortInput,
} from '../../graphql';

import { TmDbMovieSortType, DiscoverMoviesDocument } from '../../graphql';

import { addApolloState, initializeApollo } from '../../client';

import MoviesSortPageView from '../../views/movies/sort';

const tmDbMovieSortTypes = [
  {
    route: 'decade',
    sortType: TmDbMovieSortType.Decade,
  },
  {
    route: 'genre',
    sortType: TmDbMovieSortType.Genre,
  },
  {
    route: 'release',
    sortType: TmDbMovieSortType.ReleaseOlder,
  },
  {
    route: 'year',
    sortType: TmDbMovieSortType.Year,
  },
  {
    route: 'on',
    sortType: TmDbMovieSortType.Service,
  },
] as Array<{ route: string; sortType: TmDbMovieSortType }>;

function findSortType(sortType: string) {
  return tmDbMovieSortTypes.find(type => type.route === sortType.toLowerCase());
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

    const sortInput: TmDbMovieSortInput = {
      type: sortType,
      filter: sortFilter,
    };

    const apolloClient = initializeApollo();

    const { data: moviesData } = await apolloClient.query<
      DiscoverMoviesQuery,
      DiscoverMoviesQueryVariables
    >({
      query: DiscoverMoviesDocument,
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

interface MoviesSortPageProps extends DiscoverMoviesQuery {
  sort?: TmDbMovieSortInput;
}

const MoviesSortPage: NextPage<MoviesSortPageProps> = ({ ...props }) => (
  <MoviesSortPageView {...props} />
);

export default MoviesSortPage;
