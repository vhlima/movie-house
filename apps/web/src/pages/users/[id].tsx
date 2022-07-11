import type { GetStaticPaths, NextPage } from 'next';

import { GetStaticProps } from 'next';

import type { UserResponse } from '../../types/user';

import { USER, ALL_USERS_ID } from '../../graphql/user';

import client from '../../api';

import Card from '../../components/Card';

import UserMovieReviewBody from '../../views/users/reviews/components/Body';

import ProfileHeader from '../../views/users/ProfileHeader';

import FavoriteMovies from '../../views/users/FavoriteMovies';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id) return { props: { targetUser: undefined } };

  const { id } = params;

  try {
    const userResult = await client.query<{ user: UserResponse }>({
      query: USER,
      variables: { userId: id },
    });

    return {
      props: {
        targetUser: userResult.data.user,
      },
    };
  } catch (err) {
    console.error(err);
  }

  return { props: { targetUser: undefined } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const usersResult = await client.query<{ users: UserResponse[] }>({
    query: ALL_USERS_ID,
  });

  const paths = usersResult.data.users.map(u => ({ params: { id: u._id } }));

  return {
    paths,
    fallback: true,
  };
};

const UserProfile: NextPage<{ targetUser: UserResponse }> = ({
  targetUser,
}) => {
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
        <UserMovieReviewBody preview />
      </Card>

      <Card title="Recent reviews" noPadding>
        <UserMovieReviewBody preview />
      </Card>

      <Card title="Popular reviews" noPadding>
        <UserMovieReviewBody preview />
      </Card>
    </ProfileHeader>
  );
};

export default UserProfile;
