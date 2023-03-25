import type { GetServerSideProps, NextPage } from 'next';

import * as Yup from 'yup';

import type { FindMovieQuery, FindMovieQueryVariables } from '@/graphql';

import { FindMovieDocument } from '@/graphql';

import { initializeApollo } from '../../../client';

import CreateReviewView from '../../../views/reviews/create';

export const getServerSideProps: GetServerSideProps = async context => {
  const requestValidationSchema = Yup.object().shape({
    movie: Yup.number().min(0).max(1000000),
  });

  try {
    const { movie } = await requestValidationSchema.validate(context.query);

    const apolloClient = initializeApollo();

    const { data: movieData } = await apolloClient.query<
      FindMovieQuery,
      FindMovieQueryVariables
    >({
      query: FindMovieDocument,
      variables: { movieId: movie },
    });

    return {
      props: {
        ...movieData,
      },
    };
  } catch (err) {
    return { props: {} };
  }
};

const CreateReviewPage: NextPage<FindMovieQuery> = ({ movie }) => (
  <CreateReviewView movie={movie} />
);

export default CreateReviewPage;
