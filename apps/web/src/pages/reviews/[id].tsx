import { NextPage } from 'next';

import { MovieData } from '../../types';

import * as fakeData from '../../data/fake.json';

import MovieHeader from '../../components/MovieHeader';

import UserMovieReview from '../../components/UserMovieReview';

const Reviews: NextPage = () => {
  const movie = fakeData.movies[0] as MovieData;

  return (
    <MovieHeader movie={movie}>
      <UserMovieReview />
    </MovieHeader>
  );
};

export default Reviews;
