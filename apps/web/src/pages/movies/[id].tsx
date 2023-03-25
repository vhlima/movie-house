import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { useRouter } from 'next/router';

import * as Yup from 'yup';

import type {
  FindMovieWithCreditsQuery,
  FindMovieWithCreditsQueryVariables,
} from '@/graphql';

import { FindMovieWithCreditsDocument } from '@/graphql';

import Skeleton from '@/components/Skeleton';
import { MovieCover } from '@/components/movie';
import { addApolloState, initializeApollo } from '../../client';

import MovieView from '../../views/movies/movie';

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
    return (
      <div className="p-3 mt-40 animate-pulse">
        <div className="flex justify-between">
          <div className="flex flex-col w-full z-10">
            <Skeleton className="h-8" />

            <Skeleton className="h-6 mt-1 mb-2" />

            <Skeleton className="h-8 mt-auto" />
          </div>

          <MovieCover className="ml-2" />
        </div>
      </div>
    );
  }

  return <MovieView {...props} />;
};

export default MoviePage;
