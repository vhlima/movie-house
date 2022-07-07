import { NextPage } from 'next';

import { MovieData } from '../../types';

import * as fakeData from '../../data/fake.json';

import MovieHeader from '../../views/movies/Header';

import UserMovieReview from '../../views/users/reviews';

const Reviews: NextPage = () => {
  const movie = fakeData.movies[0] as MovieData;

  return (
    <MovieHeader movie={movie}>
      <UserMovieReview />
    </MovieHeader>
  );
};

export default Reviews;
