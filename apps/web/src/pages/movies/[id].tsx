import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import Image from 'next/image';

import { movieList } from '../../data/fakeData';

import Card from '../../components/Card';
import Link from '../../components/Link';
import Carousel from '../../components/Carouselv2';

import Layout from '../../Layout';

import UserListPreview from '../../components/UserListPreview';
import MovieCoverImage from '../../components/MovieCoverImage';
import { MovieData } from '../../types';
import { fetcher } from '../../utils';
import MovieHeader from '../../components/MovieHeader';
import UserMovieReview from '../../components/UserMovieReview';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params) {
    const { id } = params;

    if (id) {
      try {
        const movie = await fetcher<MovieData>(`/api/movies/${id}`);

        console.log(`fetch movie props? ${id}`);

        return {
          props: {
            movie,
          },
        };
      } catch (err) {
        console.error(err);
      }
    }
  }

  return { props: { user: undefined } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const movies = await fetcher<MovieData[]>('/api/movies/');

  const paths = movies.map(m => ({ params: { id: m.id } }));

  return {
    paths,
    fallback: true,
  };
};

const Movie: NextPage<{ movie: MovieData }> = ({ movie }) => {
  if (!movie) {
    return (
      <Layout>
        <h1 className="text-red-500">Movie not found</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <MovieHeader movie={movie}>
        <div className="flex flex-col gap-4">
          <p className="text-grey-200 mt-4">{movie.spoiler}</p>

          <div className="flex">
            {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => {
              const { rating } = movie;

              return (
                <Star
                  key={number}
                  isChecked={rating > number}
                  half={rating - Math.floor(rating) !== 0}
                />
              );
            })} */}
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
            <Carousel spaceBetween={12}>
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
              <UserMovieReview preview />
              <UserMovieReview preview />
              <UserMovieReview preview />
            </div>
          </Card>

          <Card title="Recent reviews" link={{ href: '/' }} noPadding>
            <div>
              <UserMovieReview preview />
              <UserMovieReview preview />
              <UserMovieReview preview />
            </div>
          </Card>

          <Card title="Similar movies" noPadding>
            <div className="flex gap-2">
              {movieList.map(m => (
                <Link key={m.id} className="hover:opacity-60" href="/">
                  <MovieCoverImage src={m.coverUrl} />
                </Link>
              ))}
            </div>
          </Card>

          <Card title="Popular lists" noPadding>
            <UserListPreview />
          </Card>
        </div>
      </MovieHeader>
    </Layout>
  );
};

export default Movie;
