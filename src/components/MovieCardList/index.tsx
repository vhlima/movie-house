import React from 'react';

import Image from 'next/image';

import { MovieProps } from '../../hooks/useMovie';

interface MovieCardListProps {
  movies: MovieProps[];
}

const MovieCardList: React.FC<MovieCardListProps> = ({ movies }) => (
  <div className="flex relative w-full h-32">
    {movies.map((movie, index) => (
      <div className="relative w-full h-full" style={{ zIndex: 999 - index }}>
        <Image layout="fill" objectFit="fill" src={movie.coverUrl} />
      </div>
    ))}
  </div>
);

export default MovieCardList;
