import React, { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { MovieData } from '../../types';

import MovieCard from './components/MovieCard';

import MovieRatingModal from './components/MovieRatingModal';

interface MovieListProps {
  movies: MovieData[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const [ratingMovie, setRatingMovie] = useState<MovieData>();

  return (
    <>
      <AnimatePresence>
        {ratingMovie && (
          <MovieRatingModal
            movie={ratingMovie}
            onClose={() => setRatingMovie(undefined)}
          />
        )}
      </AnimatePresence>

      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          openRatingModal={() => setRatingMovie(movie)}
        />
      ))}
    </>
  );
};

export default MovieList;
