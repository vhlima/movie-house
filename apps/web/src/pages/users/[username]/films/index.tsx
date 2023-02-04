import type { NextPage, GetServerSideProps } from 'next';

import * as Yup from 'yup';

import type {
  FindUserQuery,
  FindUserPreMadeListMoviesQuery,
} from '../../../../graphql';

import { PreMadeListType } from '../../../../graphql';

import { addApolloState, initializeApollo } from '../../../../client';

import { withFetchPreMadeListMovies } from '../../../../hocs/withFetchPreMadeListMovies';

import MovieListView from '../../../../views/users/components/MovieListView';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const requestValidationSchema = Yup.object().shape({
    username: Yup.string().required(),
  });

  try {
    const { username } = await requestValidationSchema.validate(query);

    const apolloClient = initializeApollo();

    const fetchResponse = withFetchPreMadeListMovies({
      apolloClient,
      username,
      listType: PreMadeListType.Watched,
    });

    return addApolloState(apolloClient, fetchResponse);
  } catch (err) {
    return { props: { notFound: true } };
  }
};

type FindUserQueryProps = FindUserQuery & FindUserPreMadeListMoviesQuery;

const UserFilmsPage: NextPage<FindUserQueryProps> = ({
  user,
  userPreMadeListMovies,
}) => <MovieListView user={user} movies={userPreMadeListMovies} />;

export default UserFilmsPage;
