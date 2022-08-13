import Image from 'next/image';

import type { MovieData } from '../../../../../../graphql/Movie/types';

import Link from '../../../../../../components/Link';

import SvgIcon from '../../../../../../components/SvgIcon';

import MovieRatingStar from '../../../RatingStar';

interface MovieCardProps {
  movie: MovieData;
  openRatingModal: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, openRatingModal }) => (
  <div className="flex flex-col w-44 flex-shrink-0">
    <div className="h-72 relative rounded-t-md overflow-hidden cursor-pointer">
      <Image
        className="transition-transform hover:scale-105"
        layout="fill"
        objectFit="cover"
        src={movie.backdropUrl}
      />
    </div>

    <div className="flex flex-col flex-grow p-2 rounded-b-md bg-grey-800 text-grey-200">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <SvgIcon
            className="text-yellow-500"
            iconType="AiFillStar"
            size={20}
          />

          <span>5.2</span>
        </div>

        <button
          className="p-2 rounded-md group hover:bg-grey-600"
          type="button"
          onClick={openRatingModal}
        >
          <MovieRatingStar className="group-hover:text-white" color="blue" />
        </button>
      </div>

      <Link
        href={{
          pathname: '/movies/[movieId]',
          query: { movieId: movie.id },
        }}
        className="py-2 hover:underline"
      >
        {movie.originalTitle}
      </Link>

      {/* <div className="flex flex-col gap-2 mt-auto">
        <Button buttonStyle="secondary" className="gap-2">
          <SvgIcon className="text-grey-500" iconType="BsPlusLg" size={18} />

          <span>Add to watchlist</span>
        </Button>

        <Button buttonStyle="tertiary" className="gap-2">
          <SvgIcon className="text-grey-500" iconType="FaPlay" size={18} />

          <span>Trailer</span>
        </Button>
      </div> */}
    </div>
  </div>
);

export default MovieCard;
