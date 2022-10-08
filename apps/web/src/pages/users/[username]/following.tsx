import type { NextPage, GetServerSideProps } from 'next';

import type { FindUserQuery, FindUserQueryVariables } from '../../../graphql';

import { FindUserDocument } from '../../../graphql';

import client from '../../../api';

import Card from '../../../components/Card';

import UserFollows from '../../../views/users/follows';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const defaultProps = { props: {} };

  const { username } = params;

  if (!username || typeof username !== 'string') return defaultProps;

  try {
    const { data } = await client.query<FindUserQuery, FindUserQueryVariables>({
      query: FindUserDocument,
      variables: { username },
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

  return defaultProps;
};

const UserFollowing: NextPage<FindUserQuery> = ({ user }) => {
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