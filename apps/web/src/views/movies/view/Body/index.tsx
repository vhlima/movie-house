import { PropsWithChildren, useState } from 'react';

import Image from 'next/image';

import type {
  MovieCreditsResponse,
  MovieResponse,
} from '../../../../types/movie';

import { useAuth } from '../../../../hooks/useAuth';

import Link from '../../../../components/Link';

import Card from '../../../../components/Card';

import Button from '../../../../components/Button';

import MovieRatingModal from '../../components/RatingModal';

import Carousel from '../../../../components/Carousel';
import TextShorter from '../../../../components/TextShorter';

interface MovieBodyProps {
  movie: MovieResponse;
  credits: MovieCreditsResponse;
}

const MovieBody: React.FC<PropsWithChildren<MovieBodyProps>> = ({
  movie,
  credits,
  children,
}) => {
  const { user } = useAuth();

  const [isRating, setRating] = useState<boolean>(false);

  return (
    <>
      {user && isRating && (
        <MovieRatingModal movie={movie} onClose={() => setRating(false)} />
      )}

      <div className="flex flex-col gap-4">
        <TextShorter
          className="text-grey-200 mt-4"
          text={movie.overview}
          maxCharacters={200}
        />

        <div className="flex gap-2 flex-wrap">
          {movie.genres.map(genre => (
            <Link
              className="py-1 px-2 border rounded-md border-grey-700 transition-colors hover:bg-grey-600"
              key={`genre-${genre.id}`}
              href="/"
            >
              <h1 className="text-grey-100 whitespace-nowrap">{genre.name}</h1>
            </Link>
          ))}
        </div>

        {user && (
          <Button
            buttonStyle="secondary"
            onClick={() => setRating(prev => !prev)}
          >
            Rate this movie
          </Button>
        )}

        <Card title="Main cast" link={{ href: '/' }} noPadding>
          <Carousel spaceBetween={12}>
            {credits.cast.slice(0, 10).map(actor => (
              <div
                className="flex flex-col gap-1 w-24 flex-shrink-0"
                key={`actor-${actor.id}`}
              >
                <Link
                  className="flex flex-col gap-2 items-center group"
                  href="/"
                >
                  <div className="relative w-20 h-20 border-grey-800 border rounded-full overflow-hidden hover:opacity-60">
                    {!actor.profilePictureUrl ? (
                      <div className="flex items-center  justify-center w-full h-full bg-grey-800">
                        <span className="text-grey-100 text-4xl">?</span>
                      </div>
                    ) : (
                      <Image
                        layout="fill"
                        objectFit="cover"
                        src={actor.profilePictureUrl}
                      />
                    )}
                  </div>

                  <h1 className="text-grey-100 font-semibold text-center group-hover:underline">
                    {actor.original_name}
                  </h1>
                </Link>

                <span className="text-grey-200 text-xs text-center">
                  {actor.character}
                </span>
              </div>
            ))}
          </Carousel>
        </Card>

        {children}
      </div>
    </>
  );
};

export default MovieBody;
