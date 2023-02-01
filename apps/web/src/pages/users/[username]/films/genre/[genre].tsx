import type { NextPage, GetServerSideProps } from 'next';

import * as Yup from 'yup';

import type {
  FindUserPreMadeListMoviesByGenreQuery,
  FindUserPreMadeListMoviesByGenreQueryVariables,
  FindUserQuery,
  FindUserQueryVariables,
} from '../../../../../graphql';

import {
  PreMadeListType,
  FindUserDocument,
  FindUserPreMadeListMoviesByGenreDocument,
} from '../../../../../graphql';

import { addApolloState, initializeApollo } from '../../../../../client';

import UserFilmsView from '../../../../../views/users/films';

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  const requestValidationSchema = Yup.object().shape({
    username: Yup.string().required(),
    genre: Yup.string().required(),
  });

  try {
    const { username, genre } = await requestValidationSchema.validate(query);

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
      FindUserPreMadeListMoviesByGenreQuery,
      FindUserPreMadeListMoviesByGenreQueryVariables
    >({
      query: FindUserPreMadeListMoviesByGenreDocument,
      variables: {
        userId: userData.user.id,
        genres: genre.split(',').map(genreId => parseInt(genreId, 10)),
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

type FindUserQueryProps = FindUserQuery & FindUserPreMadeListMoviesByGenreQuery;

const UserFilmsPage: NextPage<FindUserQueryProps> = ({
  user,
  userPreMadeListMoviesByGenre,
}) => <UserFilmsView user={user} movies={userPreMadeListMoviesByGenre} />;

export default UserFilmsPage;
