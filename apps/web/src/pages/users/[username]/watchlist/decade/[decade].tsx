import type { NextPage, GetServerSideProps } from 'next';

import * as Yup from 'yup';

import { getDecade } from 'date-fns';

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
    decade: Yup.number().required().min(1870).max(getDecade(new Date())),
  });

  try {
    const { username, decade } = await requestValidationSchema.validate(query);

    const apolloClient = initializeApollo();

    const fetchResponse = await withFetchPreMadeListMovies({
      apolloClient,
      username,
      listType: PreMadeListType.Watchlist,
      sort: {
        type: MovieSortType.Decade,
        filter: decade,
      },
    });

    return addApolloState(apolloClient, {
      props: {
        ...fetchResponse.props,
        decade,
      },
    });
  } catch (err) {
    return { notFound: true };
  }
};

type UserFilmsDecadePageProps = FindUserQuery &
  FindUserPreMadeListMoviesQuery & { decade: number };

const UserFilmsDecadePage: NextPage<UserFilmsDecadePageProps> = ({
  decade,
  user,
  userPreMadeListMovies,
}) => (
  <MovieListView
    user={user}
    movies={userPreMadeListMovies}
    navigation={{ year: decade, isDecade: true }}
  />
);

export default UserFilmsDecadePage;
