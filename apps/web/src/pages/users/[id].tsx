import type { GetStaticPaths, NextPage } from 'next';

import Image from 'next/image';

import { GetStaticProps } from 'next';

import { useRouter } from 'next/router';
import { useState } from 'react';
import client from '../../api';

import { MovieData, UserData } from '../../types';

import { useAuth } from '../../hooks/useAuth';

import UserMovieReview from '../../components/UserMovieReview';

import UserProfileNumber from '../../pageComponents/users/components/UserProfileNumber';

import Card from '../../components/Card';
import Button from '../../components/Button';

import Layout from '../../Layout';
import UserProfilePicture from '../../components/UserProfilePicture';
import { USER, ALL_USERS_ID } from '../../graphql/user';
import AddFavoriteMovieModal from '../../pageComponents/users/components/AddFavoriteMovieModal';
import SvgIcon from '../../components/SvgIcon';
import MovieCard from '../../components/MovieCard2';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params) {
    const { id } = params;

    if (id) {
      try {
        const usersResult = await client.query<{ users: UserData[] }>({
          query: USER,
        });

        return {
          props: {
            targetUser: usersResult.data.users.find(u => u._id === id),
          },
        };
      } catch (err) {
        console.error(err);
      }
    }
  }

  return { props: { targetUser: undefined } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const usersResult = await client.query<{ users: UserData[] }>({
    query: ALL_USERS_ID,
  });

  const paths = usersResult.data.users.map(u => ({ params: { id: u._id } }));

  return {
    paths,
    fallback: true,
  };
};

const MAX_FAVORITE_MOVIES = 4;

const UserProfile: NextPage<{ targetUser: UserData }> = ({ targetUser }) => {
  const { user, followUser, unfollowUser } = useAuth();

  // TODO change that
  const { push } = useRouter();

  const [favoriteMovies, setFavoriteMovies] = useState<MovieData[]>([]);

  const [isAddingFavoriteMovie, setAddingFavoriteMovie] =
    useState<boolean>(false);

  const handleAddFavoriteMovie = (movie: MovieData) => {
    setFavoriteMovies(prev => {
      if (prev.length >= MAX_FAVORITE_MOVIES) {
        return prev;
      }

      return [...prev, movie];
    });

    setAddingFavoriteMovie(false);
  };

  if (!targetUser) {
    return (
      <Layout>
        <h1 className="text-red-500">User not found</h1>
      </Layout>
    );
  }

  const isOwnProfile = user && user._id === targetUser._id;

  const isFollowing = user && user.following.includes(targetUser._id);

  return (
    <Layout>
      {isAddingFavoriteMovie && (
        <AddFavoriteMovieModal
          onSelect={handleAddFavoriteMovie}
          onClose={() => setAddingFavoriteMovie(false)}
        />
      )}

      <div className="flex">
        <div className="w-full h-44 absolute z-0">
          <Image
            layout="fill"
            objectFit="fill"
            src="https://a.ltrbxd.com/resized/sm/upload/cb/ch/lf/md/oslo-august-31-1200-1200-675-675-crop-000000.jpg"
          />

          <div className="absolute bottom-0 h-20 w-full z-10 bg-gradient-to-t from-grey-900" />
        </div>

        <div className="flex flex-col gap-4 px-3 mt-32 z-10">
          <div className="flex items-center gap-2">
            <UserProfilePicture
              imageSize="lg"
              src={targetUser.profilePicture}
            />

            <div className="flex flex-grow flex-wrap items-center gap-x-2">
              <h1 className="text-grey-100 text-2xl font-semibold">
                {targetUser.username}
              </h1>

              <div className="bg-movieHouse-mid rounded-md px-1">
                <span className="text-white text-sm">Patron</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {!isOwnProfile ? (
              <>
                <Button
                  buttonStyle="secondary"
                  buttonSize="xs"
                  onClick={() =>
                    !isFollowing
                      ? followUser(targetUser._id)
                      : unfollowUser(targetUser._id)
                  }
                >
                  {!isFollowing ? 'Follow' : 'Unfollow'}
                </Button>

                <Button buttonStyle="secondary" buttonSize="xs">
                  Message
                </Button>
              </>
            ) : (
              <Button
                buttonStyle="secondary"
                buttonSize="xs"
                onClick={() => push('/settings')}
              >
                Profile settings
              </Button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <UserProfileNumber
              link={{ href: '/' }}
              number={1595}
              text="movies"
            />

            <UserProfileNumber
              link={{ href: '/' }}
              number={118}
              text="This year"
            />

            <UserProfileNumber link={{ href: '/' }} number={48} text="Lists" />

            <div className="flex">
              <UserProfileNumber
                link={{ href: '/' }}
                number={138}
                text="Following"
              />

              <UserProfileNumber
                link={{ href: '/' }}
                number={116943}
                text="Followers"
              />
            </div>
          </div>

          <Card title="About me" noPadding>
            <p className="text-grey-200">
              guy on youtube (karsten runquist) // guy on podcast (karstcast)
              <br />
              •
              <br />
              <br />
              top 4 favorites are not actual top favorites, just films Im really
              into each month.
            </p>
          </Card>

          <Card title="Favorite movies" noPadding>
            <div className="flex gap-2 h-28">
              {favoriteMovies.map(movie => (
                <MovieCard
                  key={movie.id}
                  movieCoverUrl={movie.coverUrl}
                  cardSize="full"
                />
              ))}

              {Array.from(
                {
                  length: MAX_FAVORITE_MOVIES - favoriteMovies.length,
                },
                (v, k) => k,
              ).map(l =>
                !isOwnProfile ? (
                  <div className="w-full rounded-md border-2 border-grey-800" />
                ) : (
                  <button
                    className="flex w-full rounded-md border-2 border-grey-800 overflow-hidden outline-none hover:border-movieHouse-mid focus:border-movieHouse-mid"
                    key={l}
                    type="button"
                    onClick={() => setAddingFavoriteMovie(true)}
                  >
                    <div className="flex items-center justify-center w-full p-2">
                      <SvgIcon
                        className="text-grey-500"
                        iconType="AiOutlinePlusCircle"
                        size={30}
                      />
                    </div>
                  </button>
                ),
              )}
            </div>

            {JSON.stringify(favoriteMovies) !== JSON.stringify([]) && (
              <Button type="submit" buttonSize="sm">
                Save changes
              </Button>
            )}
          </Card>

          <Card title="Pinned reviews" noPadding>
            <UserMovieReview preview />
          </Card>

          <Card title="Recent reviews" noPadding>
            <UserMovieReview preview />
          </Card>

          <Card title="Popular reviews" noPadding>
            <UserMovieReview preview />
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
