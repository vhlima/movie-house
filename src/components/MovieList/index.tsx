import React, { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { MovieProps } from '../../hooks/useMovie';

import MovieCard from './components/MovieCard';

import MovieRatingModal from './components/MovieRatingModal';

interface MovieListProps {
  movies: MovieProps[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const [ratingMovie, setRatingMovie] = useState<MovieProps>();

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
