import React from 'react';

import { movieList } from '../../data/fakeData';

import MovieCoverImage from '../MovieCoverImage';

import Star from '../Star';

import Link from '../Link';

import MovieReview from '../MovieReview';

const UserReviewPreview: React.FC = () => {
  const movie = movieList[0];

  return (
    <div>
      <div className="flex gap-2">
        <MovieCoverImage src={movie.coverUrl} />

        <div className="flex flex-wrap">
          <div
            className="text-grey-100 font-semibold text-2xl whitespace-nowrap hover:text-grey-200"
            // href="/"
          >
            {movie.name}
          </div>

          <span className="text-grey-200">{movie.releaseDate.year}</span>
        </div>
      </div>

      <MovieReview />
    </div>
  );
};

export default UserReviewPreview;
