import type { GetServerSideProps, NextPage } from 'next';

import type {
  Movie,
  FindMovieQuery,
  FindMovieQueryVariables,
} from '../../../graphql';

import { FindMovieDocument } from '../../../graphql';

import { CreateReviewProvider } from '../../../views/reviews/create/hooks/useReviewCreate';

import CreateReviewView from '../../../views/reviews/create';

import client from '../../../api';

export const getServerSideProps: GetServerSideProps = async context => {
  const defaultProps = { props: { movie: null } };

  const { query } = context;

  if (!query) return defaultProps;

  const { movie: movieId } = query;

  // TODO change that to number
  if (!movieId || typeof movieId !== 'string') return defaultProps;

  const { data } = await client.query<FindMovieQuery, FindMovieQueryVariables>({
    query: FindMovieDocument,
    variables: { movieId: parseInt(movieId, 10) },
  });

  if (data) {
    return {
      props: {
        movie: data.movie,
      },
    };
  }

  return defaultProps;
};

// TODO review that page, maybe we can put this provider inside review view and keep page code cleaner

const CreateReviewPage: NextPage<FindMovieQuery> = ({ movie }) => (
  <CreateReviewProvider movieFromParams={movie as Movie}>
    <CreateReviewView />
  </CreateReviewProvider>
);

export default CreateReviewPage;
