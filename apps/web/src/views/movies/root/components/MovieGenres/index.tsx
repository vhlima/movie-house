import type { Genre } from '../../../../../graphql';

import Link from '../../../../../components/Link';

interface MovieGenresProps {
  genres: Genre[];
}

const MovieGenres: React.FC<MovieGenresProps> = ({ genres }) => (
  <ul className="flex gap-2 flex-wrap">
    {genres.map(genre => (
      <li
        className="border rounded-md border-grey-700 transition-colors hover:bg-grey-600"
        key={`movie-genre-${genre.id}`}
        title={genre.name}
      >
        <Link href="/">
          <h1 className="text-grey-100 whitespace-nowrap py-1 px-2">
            {genre.name}
          </h1>
        </Link>
      </li>
    ))}
  </ul>
);

export default MovieGenres;
