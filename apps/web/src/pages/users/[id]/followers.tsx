import type { NextPage, GetServerSideProps } from 'next';

import type { FindUserQuery, FindUserQueryVariables } from '../../../graphql';

import { FindUserDocument } from '../../../graphql';

import client from '../../../api';

import Card from '../../../components/Card';

import UserFollows from '../../../views/users/follows';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const defaultProps = { props: {} };

  const { id } = params;

  if (!id || typeof id !== 'string') return defaultProps;

  try {
    const { data } = await client.query<FindUserQuery, FindUserQueryVariables>({
      query: FindUserDocument,
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

  return defaultProps;
};

const UserFollowers: NextPage<FindUserQuery> = ({ user }) => {
  if (!user) {
    // user not found
  }

  return (
    <Card title="Followers">
      <UserFollows followType="followers" userId={user.id} />
    </Card>
  );
};

export default UserFollowers;
