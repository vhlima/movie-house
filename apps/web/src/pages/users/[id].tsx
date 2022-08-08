import type { GetStaticPaths, NextPage, GetStaticProps } from 'next';

import type { UserResponse } from '../../types/user';

import { USER } from '../../graphql/user';

import client from '../../api';

import UserProfileView from '../../views/users/profile';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const defaultProps = { props: { user: undefined } };

  const { id } = params;

  if (!id) return defaultProps;

  try {
    const { data } = await client.query<{ user: UserResponse }>({
      query: USER,
      variables: { userId: id },
    });

    return {
      props: {
        user: data.user,
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

const UserProfile: NextPage<{ user: UserResponse }> = ({ user }) => {
  if (!user) {
    return <h1 className="text-red-500">User not found</h1>;
  }

  return <UserProfileView user={user} />;
};

export default UserProfile;
