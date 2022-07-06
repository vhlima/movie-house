import React from 'react';

import { MovieData } from '../../types';

// import Carousel from '../Carousel';
import Carousel from '../Carouselv2';

import MovieList from '../MovieList';

interface MovieCarouselProps {
  movies: MovieData[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => (
  <Carousel spaceBetween={12}>
    <MovieList movies={movies} />
  </Carousel>
);

export default MovieCarousel;
