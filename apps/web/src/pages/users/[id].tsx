import type { GetStaticPaths, NextPage } from 'next';

import { GetStaticProps } from 'next';

import type { UserResponse } from '../../types/user';

import { USER } from '../../graphql/user';

import client from '../../api';

import Card from '../../components/Card';

import ProfileHeader from '../../views/users/ProfileHeader';

import FavoriteMovies from '../../views/users/FavoriteMovies';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const defaultProps = { props: { targetUser: undefined } };

  const { id } = params;

  if (!id) return defaultProps;

  try {
    const { data } = await client.query<{ user: UserResponse }>({
      query: USER,
      variables: { userId: id },
    });

    return {
      props: {
        targetUser: data.user,
      },
    };
  } catch (err) {
    console.error(err);
  }

  return defaultProps;
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

const UserProfile: NextPage<{ targetUser: UserResponse }> = ({
  targetUser,
}) => {
  if (!targetUser) {
    return <h1 className="text-red-500">User not found</h1>;
  }

  return (
    <ProfileHeader user={targetUser}>
      <Card title="About me" noPadding>
        <p className="text-grey-200 whitespace-pre-wrap">
          {targetUser.biography}
        </p>
      </Card>

      <FavoriteMovies user={targetUser} />

      <Card title="Pinned reviews" noPadding>
        {/* <UserMovieReviewBody preview />-['] */}
      </Card>

      <Card title="Recent reviews" noPadding>
        {/* <UserMovieReviewBody preview /> */}
      </Card>

      <Card title="Popular reviews" noPadding>
        {/* <UserMovieReviewBody preview /> */}
      </Card>
    </ProfileHeader>
  );
};

export default UserProfile;
