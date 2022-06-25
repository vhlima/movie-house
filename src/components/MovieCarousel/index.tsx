import React, { useState } from 'react';

import { MovieProps } from '../../hooks/useMovie';

import Carousel from '../Carousel';

import MovieCard from './components/MovieCard';

import MovieRatingModal from './components/MovieRatingModal';

interface MovieCarouselProps {
  movies: MovieProps[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => {
  const [ratingMovie, setRatingMovie] = useState<MovieProps>();

  return (
    <>
      {ratingMovie && (
        <MovieRatingModal
          movie={ratingMovie}
          onClose={() => setRatingMovie(undefined)}
        />
      )}

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
