import React from 'react';

import { FaPlay } from 'react-icons/fa';

import { BsPlusLg } from 'react-icons/bs';

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import Image from 'next/image';

import { MovieProps } from '../../../../hooks/useMovie';

import Link from '../../../Link';

import Button from '../../../Button';

interface MovieCardProps {
  movie: MovieProps;
  openRatingModal: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, openRatingModal }) => (
  <div className="flex flex-col w-44 flex-shrink-0">
    <div className="h-72 relative rounded-t-md overflow-hidden cursor-pointer">
      <Image
        className="transition-transform hover:scale-105"
        layout="fill"
        objectFit="cover"
        src={movie.coverUrl}
      />
    </div>

    <div className="flex flex-col flex-grow p-2 rounded-b-md bg-grey-800 text-grey-200">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <AiFillStar className="text-yellow-500" size={20} />

          <span>{movie.rating}</span>
        </div>

        <button
          className="p-2 rounded-md group hover:bg-grey-600"
          type="button"
          onClick={openRatingModal}
        >
          <AiOutlineStar
            className="text-blue-500 group-hover:text-white"
            size={20}
          />
        </button>
      </div>

      <Link
        href={{
          pathname: '/movies/[movieId]',
          query: { movieId: movie.id },
        }}
        className="py-2 hover:underline"
      >
        {movie.name}
      </Link>

      <div className="flex flex-col gap-2 mt-auto">
        <Button buttonStyle="secondary" className="gap-2">
          <BsPlusLg className="text-grey-500" size={18} />

          <span>Add to watchlist</span>
        </Button>

        <Button buttonStyle="tertiary" className="gap-2">
          <FaPlay className="text-grey-500" size={18} />

          <span>Trailer</span>
        </Button>
      </div>
    </div>
  </div>
);

export default MovieCard;
