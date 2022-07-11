import type { PropsWithChildren } from 'react';

import Skeleton from '../../../../../components/Skeleton';

const MovieBodySkeleton: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="flex flex-col gap-4">
    <Skeleton className="h-32 mt-4" />

    <Skeleton className="w-52 h-5" />

    <div className="flex gap-2 flex-wrap">
      {[1, 2, 3, 4].map(n => (
        <Skeleton className="w-16 h-9" key={n} />
      ))}
    </div>

    {/* <p className="text-grey-200 mt-4">{movie.overview}</p> */}

    {/* <div className="flex">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => {
        const rating = movie.vote_average;

        return (
          <MovieRatingStar
            key={number}
            checked={rating >= number}
            color={rating >= number ? 'blue' : 'grey'}
            // half={rating - Math.floor(rating) !== 0}
          />
        );
      })}
    </div> */}

    {/* <div className="flex gap-2 flex-wrap">
      {movie.genres.map(genre => (
        <Link
          className="py-1 px-2 border rounded-md border-grey-700 transition-colors hover:bg-grey-600"
          key={genre.id}
          href="/"
        >
          <h1 className="text-grey-100 whitespace-nowrap">{genre.name}</h1>
        </Link>
      ))}
    </div> */}

    {/* <Card title="Main cast" link={{ href: '/' }} noPadding>
      <Carousel spaceBetween={12}>
        {movie.cast.map(actor => (
          <div
            className="flex flex-col gap-1 w-24 flex-shrink-0"
            key={actor.id}
          >
            <Link className="flex flex-col gap-2 items-center group" href="/">
              <div className="relative w-20 h-20 border-grey-700 border rounded-full overflow-hidden hover:opacity-60">
                <Image layout="fill" objectFit="cover" src={actor.photoUrl} />
              </div>

              <h1 className="text-grey-100 font-semibold text-center group-hover:underline">
                {actor.name}
              </h1>
            </Link>

            <span className="text-grey-200 text-xs text-center">
              {actor.role}
            </span>
          </div>
        ))}
      </Carousel>
    </Card> */}

    {children}
  </div>
);

export default MovieBodySkeleton;
