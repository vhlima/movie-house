import type { NextPage, GetServerSideProps } from 'next';

import type { UserResponse } from '../../../graphql/User/types';

import { FIND_USER } from '../../../graphql/User';

import client from '../../../api';

import Card from '../../../components/Card';

import UserFollows from '../../../views/users/follows';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const defaultProps = { props: {} };

  const { id } = params;

  if (id) {
    try {
      const { data } = await client.query<UserResponse>({
        query: FIND_USER,
        variables: { userId: id },
      });

      if (!data) return defaultProps;

      return {
        props: {
          user: data.user,
        },
      };
    } catch (err) {
      return defaultProps;
    }
  }

  return defaultProps;
};

const UserFollowing: NextPage<UserResponse> = ({ user }) => {
  if (!user) {
    // user not found
  }

  return (
    <Card title="Following">
      <UserFollows followType="following" userId={user.id} />
    </Card>
  );
};

export default UserFollowing;
