import React, { PropsWithChildren } from 'react';

import Image from 'next/image';
import { MovieData } from '../../types';

import MovieCoverImage from '../MovieCoverImage';

import Button from '../Button';

interface MovieHeaderProps {
  movie: MovieData;
}

const MovieHeader: React.FC<PropsWithChildren<MovieHeaderProps>> = ({
  movie,
  children,
}) => (
  <>
    <div className="w-full h-44 absolute z-0">
      <Image layout="fill" objectFit="fill" src={movie.backgroundUrl} />

      <div className="absolute bottom-0 h-20 w-full z-10 bg-gradient-to-t from-grey-900" />
    </div>

    <div className="p-3 mt-32">
      <div className="flex justify-between">
        <div className="flex flex-col z-10">
          <h1 className="text-grey-100 text-2xl font-semibold">{movie.name}</h1>

          <div className="text-grey-200 mb-2">
            <div className="flex items-center gap-1">
              <span className="text-sm">
                {movie.releaseDate.day}/{movie.releaseDate.month}/
                {movie.releaseDate.year}
              </span>

              <span>•</span>

              <span className="text-sm uppercase">Directed by</span>
            </div>

            <span className="text-sm font-semibold">
              {movie.crew.find(c => c.role.includes('Director'))?.name || ''}
            </span>
          </div>

          <div className="flex items-center gap-1 text-grey-200 mt-auto">
            <Button buttonStyle="secondary" buttonSize="xs" full={false}>
              Watch trailer
            </Button>

            <div className="rounded-md border border-grey-700 px-1 bg-opacity-60">
              <span>{movie.ageRestriction}</span>
            </div>

            <span>{movie.duration}</span>
          </div>
        </div>

        <MovieCoverImage src={movie.coverUrl} />
      </div>

      {children}
    </div>
  </>
);

export default MovieHeader;
