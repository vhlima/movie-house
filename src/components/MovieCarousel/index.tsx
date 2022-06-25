import React, { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { MovieProps } from '../../hooks/useMovie';

import Carousel from '../Carousel';

import MovieCard from '../MovieCard';

import MovieRatingModal from '../MovieRatingModal';

interface MovieCarouselProps {
  movies: MovieProps[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => {
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

      <Carousel>
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            openRatingModal={() => setRatingMovie(movie)}
          />
        ))}
      </Carousel>
    </>
  );
};

export default MovieCarousel;
