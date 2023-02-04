import type { NextPage, GetServerSideProps } from 'next';

import * as Yup from 'yup';

import type {
  FindUserQuery,
  FindUserPreMadeListMoviesQuery,
} from '../../../../../graphql';

import { PreMadeListType, MovieSortType } from '../../../../../graphql';

import { addApolloState, initializeApollo } from '../../../../../client';

import { withFetchPreMadeListMovies } from '../../../../../hocs/withFetchPreMadeListMovies';

import MovieListView from '../../../../../views/users/components/MovieListView';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const requestValidationSchema = Yup.object().shape({
    username: Yup.string().required(),
    genre: Yup.string().required(),
  });

  try {
    const { username, genre } = await requestValidationSchema.validate(query);

    const apolloClient = initializeApollo();

    const fetchResponse = await withFetchPreMadeListMovies({
      apolloClient,
      username,
      listType: PreMadeListType.Watchlist,
      sort: {
        type: MovieSortType.Genre,
        filter: genre.split(',').map(genreId => parseInt(genreId, 10)),
      },
    });

    return addApolloState(apolloClient, fetchResponse);
  } catch (err) {
    return { notFound: true };
  }
};

type FindUserQueryProps = FindUserQuery & FindUserPreMadeListMoviesQuery;

const UserFilmsPage: NextPage<FindUserQueryProps> = ({
  user,
  userPreMadeListMovies,
}) => <MovieListView user={user} movies={userPreMadeListMovies} />;

export default UserFilmsPage;
