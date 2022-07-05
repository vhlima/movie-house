import React from 'react';

import { MovieProps } from '../../hooks/useMovie';

// import Carousel from '../Carousel';
import Carousel from '../Carouselv2';

import MovieList from '../MovieList';

interface MovieCarouselProps {
  movies: MovieProps[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => (
  <Carousel spaceBetween={12}>
    <MovieList movies={movies} />
  </Carousel>
);

export default MovieCarousel;
