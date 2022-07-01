import React from 'react';

import Image from 'next/image';

import { MovieProps } from '../../hooks/useMovie';

interface MovieCardListProps {
  movies: MovieProps[];
}

const MovieCardList: React.FC<MovieCardListProps> = ({ movies }) => (
  <div className="flex relative w-full h-40">
    {movies.map((movie, index) => (
      <div
        className="relative min-w-0 flex-grow basis-1/3 rounded-lg float-left border border-grey-700 overflow-hidden"
        key={movie.id}
        style={{
          zIndex: 999 - index,
          marginRight: `-12.5%`,
        }}
      >
        <Image layout="fill" objectFit="fill" src={movie.coverUrl} />
      </div>
    ))}
  </div>
);

export default MovieCardList;
