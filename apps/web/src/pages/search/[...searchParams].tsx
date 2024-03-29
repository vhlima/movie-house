import type { GetServerSideProps, NextPage } from 'next';

import * as Yup from 'yup';

import type { SearchMovieQuery, SearchMovieQueryVariables } from '@/gql';

import { SearchMovieDocument } from '@/gql';

import { addApolloState, initializeApollo } from '../../client';

import SearchPageView from '../../views/search';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const requestValidationSchema = Yup.object().shape({
    searchParams: Yup.array()
      .of(Yup.string())
      .min(1)
      .max(3)
      .test(
        'test-search-params',
        'Expected [searchTerm, "page", pageNumber]',
        value => {
          if (value.length === 1) {
            return true;
          }

          return value[1] === 'page' && !Number.isNaN(Number(value[2]));
        },
      ),
  });

  try {
    const { searchParams } = await requestValidationSchema.validate(query);

    const [searchTerm, , pageNumber] = searchParams;

    const apolloClient = initializeApollo();

    const { data: movieData } = await apolloClient.query<
      SearchMovieQuery,
      SearchMovieQueryVariables
    >({
      query: SearchMovieDocument,
      variables: {
        searchTerm,
        page: pageNumber ? parseInt(pageNumber, 10) : 1,
      },
    });

    return addApolloState(apolloClient, {
      props: {
        searchTerm,
        ...movieData,
      },
    });
  } catch (err) {
    return { notFound: true };
  }
};

type SearchPageProps = SearchMovieQuery & { searchTerm: string };

const SearchPage: NextPage<SearchPageProps> = ({ searchMovie, searchTerm }) => (
  <SearchPageView searchMovie={searchMovie} searchTerm={searchTerm} />
);

export default SearchPage;
