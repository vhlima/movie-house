import React, { useState } from 'react';

import clsx from 'clsx';
import { MovieData, UserData } from '../../../types';

import { useAuth } from '../../../hooks/useAuth';

import Card from '../../../components/Card';

import Button from '../../../components/Button';

import SvgIcon from '../../../components/SvgIcon';

import MovieCover from '../../movies/components/Cover';

import AddFavoriteMovieModal from './components/AddFavoriteMovieModal';

interface ProfileHeaderProps {
  user: UserData;
}

const MAX_FAVORITE_MOVIES = 4;

/*
  This component shows user's favorite movies inside his profile.
  If current profile being shown is from current user, we show him buttons to add
  new movies to his profile.
*/

const FavoriteMovies: React.FC<ProfileHeaderProps> = ({ user }) => {
  const { user: currentUser } = useAuth();

  const [favoriteMovies, setFavoriteMovies] = useState<MovieData[]>([]);

  const [isAddingFavoriteMovie, setAddingFavoriteMovie] =
    useState<boolean>(false);

  const handleAddFavoriteMovie = (movie: MovieData) => {
    setFavoriteMovies(prev =>
      prev.length < MAX_FAVORITE_MOVIES ? [...prev, movie] : prev,
    );

    setAddingFavoriteMovie(false);
  };

  const isOwnProfile = currentUser && currentUser._id === user._id;

  const movieCardStyle =
    'flex items-center justify-center w-full rounded-md border-2 border-grey-800 text-grey-500';

  return (
    <>
      {isAddingFavoriteMovie && (
        <AddFavoriteMovieModal
          onSelect={handleAddFavoriteMovie}
          onClose={() => setAddingFavoriteMovie(false)}
        />
      )}

      <Card title="Favorite movies" noPadding>
        <div className="flex gap-2 h-28">
          {favoriteMovies.map(movie => (
            <MovieCover
              key={movie.id}
              coverUrl={movie.coverUrl}
              coverSize="full"
            />
          ))}

          {Array.from(
            {
              length: MAX_FAVORITE_MOVIES - favoriteMovies.length,
            },
            (v, k) => k,
          ).map(l =>
            !isOwnProfile ? (
              <div className={movieCardStyle}>
                <h1 className="text-3xl">?</h1>
              </div>
            ) : (
              <button
                className={clsx(
                  'overflow-hidden outline-none hover:border-movieHouse-mid focus:border-movieHouse-mid',
                  movieCardStyle,
                )}
                key={l}
                type="button"
                onClick={() => setAddingFavoriteMovie(true)}
              >
                <div className="flex items-center justify-center w-full p-2">
                  <SvgIcon iconType="AiOutlinePlusCircle" size={30} />
                </div>
              </button>
            ),
          )}
        </div>

        {JSON.stringify(favoriteMovies) !== JSON.stringify([]) && (
          <Button type="submit" buttonSize="sm">
            Save changes
          </Button>
        )}
      </Card>
    </>
  );
};

export default FavoriteMovies;
