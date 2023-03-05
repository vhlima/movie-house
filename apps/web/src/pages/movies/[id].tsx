import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { useRouter } from 'next/router';

import * as Yup from 'yup';

import type {
  FindMovieWithCreditsQuery,
  FindMovieWithCreditsQueryVariables,
} from '../../graphql';

import { FindMovieWithCreditsDocument } from '../../graphql';

import { addApolloState, initializeApollo } from '../../client';

import MovieView from '../../views/movies/movie';

import MovieInfosSkeleton from '../../components/movie/MovieInfos/Skeleton';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const requestValidationSchema = Yup.object().shape({
    id: Yup.number().required(),
  });

  try {
    const { id } = await requestValidationSchema.validate(params);

    const apolloClient = initializeApollo();

    const { data: movieData } = await apolloClient.query<
      FindMovieWithCreditsQuery,
      FindMovieWithCreditsQueryVariables
    >({
      query: FindMovieWithCreditsDocument,
      variables: { movieId: id },
    });

    return addApolloState(apolloClient, {
      props: {
        ...movieData,
      },
    });
  } catch (err) {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

const MoviePage: NextPage<FindMovieWithCreditsQuery> = ({ ...props }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <MovieInfosSkeleton />;
  }

  return <MovieView {...props} />;
};

export default MoviePage;
