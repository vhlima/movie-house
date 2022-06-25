import React from 'react';

import { MovieProps } from '../../hooks/useMovie';

import Carousel from '../Carousel';

import MovieList from '../MovieList';

interface MovieCarouselProps {
  movies: MovieProps[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => (
  <Carousel>
    <MovieList movies={movies} />
  </Carousel>
);

export default MovieCarousel;
