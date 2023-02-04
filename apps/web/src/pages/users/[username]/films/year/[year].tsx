import type { NextPage, GetServerSideProps } from 'next';

import * as Yup from 'yup';

import {
  FindUserQuery,
  FindUserPreMadeListMoviesQuery,
  MovieSortType,
  PreMadeListType,
} from '../../../../../graphql';

import { addApolloState, initializeApollo } from '../../../../../client';

import { withFetchPreMadeListMovies } from '../../../../../hocs/withFetchPreMadeListMovies';

import MovieListView from '../../../../../views/users/components/MovieListView';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const requestValidationSchema = Yup.object().shape({
    username: Yup.string().required(),
    year: Yup.number().required().min(1870).max(3000),
  });

  try {
    const { username, year } = await requestValidationSchema.validate(query);

    const apolloClient = initializeApollo();

    const fetchResponse = await withFetchPreMadeListMovies({
      apolloClient,
      username,
      listType: PreMadeListType.Watched,
      sort: {
        type: MovieSortType.Year,
        filter: year,
      },
    });

    return addApolloState(apolloClient, {
      props: {
        ...fetchResponse.props,
        year,
      },
    });
  } catch (err) {
    return { notFound: true };
  }
};

type UserFilmsYearPageProps = FindUserQuery &
  FindUserPreMadeListMoviesQuery & { year: number };

const UserFilmsYearPage: NextPage<UserFilmsYearPageProps> = ({
  year,
  user,
  userPreMadeListMovies,
}) => (
  <MovieListView
    user={user}
    movies={userPreMadeListMovies}
    navigation={{ year }}
  />
);

export default UserFilmsYearPage;
