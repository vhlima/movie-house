import type { MovieResponse } from '../../../../types/movie';

import Link from '../../../../components/Link';

import MovieCover from '../Cover';

import MovieRatingStar from '../RatingStar';

interface MovieInfoProps {
  movie: MovieResponse;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => (
  <div className="flex gap-2 mb-2">
    <MovieCover coverUrl={movie.posterUrl} />

    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-x-1 flex-wrap">
        <Link
          className="text-grey-100 text-xl font-semibold hover:text-grey-300"
          href="/"
        >
          {movie.original_title}
        </Link>

        <span className="text-grey-200">
          ({new Date(movie.release_date).getFullYear()})
        </span>
      </div>

      <MovieRatingStar color="yellow" rating={5.2} checked />
    </div>
  </div>
);

export default MovieInfo;
