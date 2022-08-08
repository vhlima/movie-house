import React, { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { MovieData } from '../../../../types';

import Carousel from '../../../../components/Carousel';

import MovieRatingModal from '../RatingModal';

import MovieCard from './components/Card';

interface MovieCarouselProps {
  movies: MovieData[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => {
  const [ratingMovie, setRatingMovie] = useState<MovieData>();

  return (
    <>
      {/* <AnimatePresence>
        {ratingMovie && (
          <MovieRatingModal
            movie={ratingMovie}
            onClose={() => setRatingMovie(undefined)}
          />
        )}
      </AnimatePresence> */}

      <Carousel spaceBetween={12}>
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
