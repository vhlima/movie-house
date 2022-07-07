import type { GetStaticPaths, NextPage } from 'next';

import { GetStaticProps } from 'next';

import { UserData } from '../../types';

import { USER, ALL_USERS_ID } from '../../graphql/user';

import client from '../../api';

import Card from '../../components/Card';

import UserMovieReview from '../../views/users/reviews';

import ProfileHeader from '../../views/users/ProfileHeader';

import FavoriteMovies from '../../views/users/FavoriteMovies';

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

const UserProfile: NextPage<{ targetUser: UserData }> = ({ targetUser }) => {
  if (!targetUser) {
    return <h1 className="text-red-500">User not found</h1>;
  }

  return (
    <ProfileHeader user={targetUser}>
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

      <FavoriteMovies user={targetUser} />

      <Card title="Pinned reviews" noPadding>
        <UserMovieReview preview />
      </Card>

      <Card title="Recent reviews" noPadding>
        <UserMovieReview preview />
      </Card>

      <Card title="Popular reviews" noPadding>
        <UserMovieReview preview />
      </Card>
    </ProfileHeader>
  );
};

export default UserProfile;
