import type { Cast } from '../../../../../graphql';

import Link from '../../../../../components/Link';
import Card from '../../../../../components/Card';
import Image from '../../../../../components/Image';
import Typography from '../../../../../components/Typography';

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
          key={`movie-cast-${actor.id}`}
        >
          <div className="flex flex-col gap-2 items-center group">
            <div className="relative w-20 h-20 border-grey-800 border rounded-full overflow-hidden hover:opacity-60">
              {!actor.profilePictureUrl ? (
                <div className="flex items-center justify-center w-full h-full bg-grey-800">
                  <Typography component="span" color="primary" size="4xl">
                    ?
                  </Typography>
                </div>
              ) : (
                <Image
                  style={{ objectFit: 'cover' }}
                  fill
                  sizes="5rem, 5rem"
                  alt={actor.originalName}
                  src={actor.profilePictureUrl}
                />
              )}
            </div>

            <Typography
              className="font-semibold text-center group-hover:underline"
              component="h2"
              color="primary"
            >
              {actor.originalName}
            </Typography>
          </div>

          <Typography className="text-center" component="span" size="xs">
            {actor.character}
          </Typography>
        </div>
      ))}
    </ul>
  </Card>
);

export default MovieCast;
