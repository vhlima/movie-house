import React, { PropsWithChildren } from 'react';

import { MovieData } from '../../../types';

import MovieCover from '../components/Cover';

import BackgroundImage from '../components/BackgroundImage';

import Button from '../../../components/Button';

interface MovieHeaderProps {
  movie: MovieData;
}

const MovieHeader: React.FC<PropsWithChildren<MovieHeaderProps>> = ({
  movie,
  children,
}) => (
  <>
    <BackgroundImage src={movie.backgroundUrl} />

    <div className="p-3 mt-36">
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

        <MovieCover coverUrl={movie.coverUrl} />
      </div>

      {children}
    </div>
  </>
);

export default MovieHeader;
