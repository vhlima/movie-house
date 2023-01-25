import type { Cast } from '../../../../../graphql';

import Link from '../../../../../components/Link';

import Card from '../../../../../components/Card';

import Image from '../../../../../components/Image';

interface MovieCastProps {
  cast: Array<{
    id: Cast['id'];
    character: Cast['character'];
    originalName: Cast['originalName'];
    profilePictureUrl: Cast['profilePictureUrl'];
  }>;
}

const MovieCast: React.FC<MovieCastProps> = ({ cast }) => (
  <Card title="Main cast" noPadding>
    <ul className="flex overflow-x-auto pb-4">
      {cast.slice(0, 10).map(actor => (
        <div
          className="flex flex-col gap-1 w-24 flex-shrink-0"
          key={`actor-${actor.id}`}
        >
          <Link className="flex flex-col gap-2 items-center group" href="/">
            <div className="relative w-20 h-20 border-grey-800 border rounded-full overflow-hidden hover:opacity-60">
              {!actor.profilePictureUrl ? (
                <div className="flex items-center  justify-center w-full h-full bg-grey-800">
                  <span className="text-grey-100 text-4xl">?</span>
                </div>
              ) : (
                <Image
                  alt={actor.originalName}
                  fill
                  style={{ objectFit: 'cover' }}
                  src={actor.profilePictureUrl}
                />
              )}
            </div>

            <h1 className="text-grey-100 font-semibold text-center group-hover:underline">
              {actor.originalName}
            </h1>
          </Link>

          <span className="text-grey-200 text-xs text-center">
            {actor.character}
          </span>
        </div>
      ))}
    </ul>
  </Card>
);

export default MovieCast;
