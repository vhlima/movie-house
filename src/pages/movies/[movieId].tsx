import type { NextPage } from 'next';

import Image from 'next/image';

import { useRouter } from 'next/router';

import { movieList } from '../../data/fakeData';

import Layout from '../../Layout';

const Movie: NextPage = () => {
  const router = useRouter();

  const { movieId } = router.query;

  const movie = movieList.find(m => m.id === movieId);

  if (!movie) {
    return (
      <Layout>
        <h1 className="text-red-500">Movie not found</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full h-44 absolute z-0">
        <Image layout="fill" objectFit="fill" src={movie.backgroundUrl} />

        <div className="absolute bottom-0 h-20 w-full z-10 bg-gradient-to-b from-complementary3 rotate-180" />
      </div>

      <div className="p-3 mt-32">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 z-10">
            <h1 className="text-secondary text-2xl font-semibold">
              {movie.name}
            </h1>

            <div>
              <div className="flex items-center gap-2 text-secondaryVariant">
                <span className="text-sm">
                  {movie.releaseDate.day}/{movie.releaseDate.month}/
                  {movie.releaseDate.year}
                </span>

                <span>•</span>

                <span className="text-sm uppercase">Directed by</span>
              </div>

              <span className="text-secondary text-sm font-semibold">
                {movie.crew.find(c => c.role.includes('Director'))?.name || ''}
              </span>
            </div>

            <div className="flex gap-2 text-secondaryVariant mt-auto">
              <button className="flex" type="button">
                Watch trailer
              </button>

              <span>{movie.duration}</span>
            </div>
          </div>

          <div className="w-24 h-32 relative rounded-md border border-complementary2 overflow-hidden">
            <Image layout="fill" objectFit="fill" src={movie.coverUrl} />
          </div>
        </div>

        <p className="text-secondaryVariant mt-4">{movie.spoiler}</p>
      </div>
    </Layout>
  );
};

export default Movie;
