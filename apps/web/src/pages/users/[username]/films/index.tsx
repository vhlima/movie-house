import type { NextPage, GetServerSideProps } from 'next';

import * as Yup from 'yup';

import {
  FindUserPreMadeListMoviesQuery,
  FindUserPreMadeListMoviesQueryVariables,
  FindUserQuery,
  FindUserQueryVariables,
  PreMadeListType,
  FindUserDocument,
  FindUserPreMadeListMoviesDocument,
} from '../../../../graphql';

import { addApolloState, initializeApollo } from '../../../../client';

import UserFilmsView from '../../../../views/users/films';

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  const requestValidationSchema = Yup.object().shape({
    username: Yup.string().required(),
  });

  try {
    const { username } = await requestValidationSchema.validate(query);

    const apolloClient = initializeApollo();

    const { data: userData } = await apolloClient.query<
      FindUserQuery,
      FindUserQueryVariables
    >({
      query: FindUserDocument,
      variables: { username },
    });

    if (!userData) {
      res.statusCode = 404;
      return { props: { notFound: true } };
    }

    const { data: moviesData } = await apolloClient.query<
      FindUserPreMadeListMoviesQuery,
      FindUserPreMadeListMoviesQueryVariables
    >({
      query: FindUserPreMadeListMoviesDocument,
      variables: {
        userId: userData.user.id,
        listType: PreMadeListType.Watched,
      },
    });

    return addApolloState(apolloClient, {
      props: {
        ...userData,
        ...moviesData,
      },
    });
  } catch (err) {
    res.statusCode = 404;
    return { props: { notFound: true } };
  }
};

type FindUserQueryProps = FindUserQuery & FindUserPreMadeListMoviesQuery;

const UserFilmsPage: NextPage<FindUserQueryProps> = ({
  user,
  userPreMadeListMovies,
}) => <UserFilmsView user={user} movies={userPreMadeListMovies} />;

export default UserFilmsPage;
