import type { NextPage } from 'next';

import Image from 'next/image';

import { MdMovie } from 'react-icons/md';

import { useRouter } from 'next/router';

import { movieList } from '../../data/fakeData';

import Card from '../../components/Card';
import Link from '../../components/Link';
import Star from '../../components/Star';
import Button from '../../components/Button';
import Carousel from '../../components/Carousel';
import MovieReview from '../../components/MovieReview';

import Layout from '../../Layout';
import MovieCarousel from '../../components/MovieCarousel';
import MovieCardList from '../../components/MovieCardList';
import LikeAndComment from '../../components/LikeAndComment';

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

        <div className="absolute bottom-0 h-20 w-full z-10 bg-gradient-to-t from-grey-900" />
      </div>

      <div className="p-3 mt-32">
        <div className="flex justify-between">
          <div className="flex flex-col z-10">
            <h1 className="text-grey-100 text-2xl font-semibold">
              {movie.name}
            </h1>

            <div className="text-grey-200">
              <div className="flex items-center gap-1">
                <span className="text-sm">
                  {movie.releaseDate.day}/{movie.releaseDate.month}/
                  {movie.releaseDate.year}
                </span>

                <span>•</span>

                <span className="text-sm uppercase">Directed by</span>
              </div>

              <span className="text-sm font-semibold">
                {movie.crew.find(c => c.role.includes('Director'))?.name || ''}
              </span>
            </div>

            <div className="flex items-center gap-2 text-grey-200 mt-auto">
              <Button buttonStyle="secondary" buttonSize="xs" full={false}>
                Watch trailer
              </Button>

              <span>{movie.duration}</span>
            </div>
          </div>

          <div className="w-24 h-32 relative rounded-md border border-grey-600 overflow-hidden">
            <Image layout="fill" objectFit="fill" src={movie.coverUrl} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-grey-200 mt-4">{movie.spoiler}</p>

          <div className="flex">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => {
              const { rating } = movie;

              return (
                <Star
                  key={number}
                  isChecked={rating > number}
                  half={rating - Math.floor(rating) !== 0}
                />
              );
            })}
          </div>

          <div className="flex gap-2 flex-wrap">
            {movie.categories.map(category => (
              <Link
                className="py-1 px-2 border rounded-md border-grey-700 transition-colors hover:bg-grey-600"
                key={category.id}
                href="/"
              >
                <h1 className="text-grey-100 whitespace-nowrap">
                  {category.name}
                </h1>
              </Link>
            ))}
          </div>

          <Card title="Main cast" link={{ href: '/' }} noPadding>
            <Carousel>
              {movie.cast.map(actor => (
                <div
                  className="flex flex-col gap-1 w-24 flex-shrink-0"
                  key={actor.id}
                >
                  <Link
                    className="flex flex-col gap-2 items-center group"
                    href="/"
                  >
                    <div className="relative w-20 h-20 border-grey-700 border rounded-full overflow-hidden hover:opacity-60">
                      <Image
                        layout="fill"
                        objectFit="cover"
                        src={actor.photoUrl}
                      />
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
          </Card>

          <Card title="Popular reviews" link={{ href: '/' }} noPadding>
            <div>
              <MovieReview />
              <MovieReview />
              <MovieReview />
            </div>
          </Card>

          <Card title="Recent reviews" link={{ href: '/' }} noPadding>
            <div>
              <MovieReview />
              <MovieReview />
              <MovieReview />
            </div>
          </Card>

          <Card title="Similar movies" noPadding>
            <h1>similar movies</h1>
          </Card>

          <Card title="Popular lists" noPadding>
            <div>
              <MovieCardList movies={movieList} />

              <h1 className="text-grey-100 font-semibold mt-2">
                what is reality?
              </h1>

              <div className="flex items-center">
                <div className="relative w-5 h-5 border border-grey-700 rounded-full overflow-hidden">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src="https://a.ltrbxd.com/resized/avatar/twitter/4/9/0/4/5/7/shard/http___pbs.twimg.com_profile_images_1001935353740177414_9ZQ0Noe4-0-80-0-80-crop.jpg?k=9c800e12d6"
                  />
                </div>

                <Link className="group" href="/">
                  <span className="ml-1 text-gray-100 font-semibold group-hover:text-grey-200">
                    karsten
                  </span>
                </Link>

                <div className="flex items-center ml-auto">
                  <span className="mr-0.5 text-grey-200 font-semibold">
                    1,327
                  </span>

                  <MdMovie className="text-grey-300" size={22} />
                </div>
              </div>

              <p className="text-grey-200">
                meditations, ruminations, and explorations on the nature of
                reality and existence. comprised most of projects ive watched,
                and some watchlist entries. organized by color. ฅ^•ﻌ•^ฅ
              </p>

              <LikeAndComment likes={14758} commentaries={138} />
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Movie;
