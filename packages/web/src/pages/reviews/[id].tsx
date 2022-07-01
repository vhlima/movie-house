import { NextPage } from 'next';

import { MovieData } from '../../types';

import * as fakeData from '../../data/fake.json';

import MovieHeader from '../../components/MovieHeader';

import Layout from '../../Layout';
import UserMovieReview from '../../components/UserMovieReview';

const Reviews: NextPage = () => {
  const movie = fakeData.movies[0] as MovieData;

  return (
    <Layout>
      <MovieHeader movie={movie}>
        <UserMovieReview />
      </MovieHeader>
    </Layout>
  );
};

export default Reviews;
