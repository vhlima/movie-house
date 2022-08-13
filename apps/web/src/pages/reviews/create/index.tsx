import type { GetServerSideProps, NextPage } from 'next';

import type { MovieResponse, MovieData } from '../../../graphql/Movie/types';

import { FIND_MOVIE } from '../../../graphql/Movie';

import CreateReviewView from '../../../views/reviews/create';

import client from '../../../api';

export interface CreateReviewPageProps {
  movie?: MovieData;
}

export const getServerSideProps: GetServerSideProps = async context => {
  const defaultProps = { props: { movie: null } };

  const { query } = context;

  if (!query) return defaultProps;

  const { movie: movieId } = query;

  // TODO change that to number
  if (!movieId || typeof movieId !== 'string') return defaultProps;

  try {
    const { data } = await client.query<MovieResponse>({
      query: FIND_MOVIE,
      variables: { movieId },
    });

    if (data) {
      return {
        props: {
          movie: data.movie,
        } as CreateReviewPageProps,
      };
    }
  } catch (err) {
    console.error(err);
  }

  return defaultProps;
};

const CreateReviewPage: NextPage<CreateReviewPageProps> = ({ movie }) => (
  <CreateReviewView movie={movie} />
);

export default CreateReviewPage;
